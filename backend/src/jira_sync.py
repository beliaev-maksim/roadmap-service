import json
import logging
import os
from jira import JIRA

from .database import get_db_connection

# Periodic Jira sync job (stub)
def sync_jira_to_db():
    # TODO: Implement Jira API fetch and DB update
    pass

def fetch_jira_data():
    try:
        # ...existing code...
        return fetch_from_jira()
    except Exception as e:
        logging.error(f"Jira API error: {e}. Using cached data.")
        return fetch_from_cache()

JIRA_URL = os.environ['JIRA_URL']
JIRA_USERNAME = os.environ['JIRA_USERNAME']
JIRA_PAT = os.environ['JIRA_PAT']
JQL_QUERY = os.environ['JQL_QUERY']

def sync_jira_data():
    """
    Fetches data from Jira and stores the raw JSON in the jira_issue_raw table.
    """
    jira = JIRA(server=JIRA_URL, basic_auth=(JIRA_USERNAME, JIRA_PAT))
    issues = jira.search_issues(JQL_QUERY, maxResults=False) # Fetch all issues

    with get_db_connection() as conn:
        with conn.cursor() as cur:
            for issue in issues:
                cur.execute(
                    """
                    INSERT INTO jira_issue_raw (jira_key, raw_data)
                    VALUES (%s, %s)
                    ON CONFLICT (jira_key) DO UPDATE SET
                        raw_data = EXCLUDED.raw_data,
                        fetched_at = CURRENT_TIMESTAMP,
                        processed_at = NULL;
                    """,
                    (issue.key, json.dumps(issue.raw)),
                )
        conn.commit()

def process_raw_jira_data():
    """
    Processes the raw Jira data from the jira_issue_raw table and populates the
    roadmap_item table.
    """
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT jira_key, raw_data FROM jira_issue_raw WHERE processed_at IS NULL")
            raw_issues = cur.fetchall()

            for jira_key, raw_data in raw_issues:
                issue_fields = raw_data['fields']
                cur.execute(
                    """
                    INSERT INTO roadmap_item (jira_key, title, description, status, release, tags)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    ON CONFLICT (jira_key) DO UPDATE SET
                        title = EXCLUDED.title,
                        description = EXCLUDED.description,
                        status = EXCLUDED.status,
                        release = EXCLUDED.release,
                        tags = EXCLUDED.tags,
                        updated_at = CURRENT_TIMESTAMP;
                    """,
                    (
                        jira_key,
                        issue_fields.get('summary'),
                        issue_fields.get('description'),
                        issue_fields.get('status', {}).get('name'),
                        issue_fields.get('fixVersions', [{}])[0].get('name') if issue_fields.get('fixVersions') else None,
                        issue_fields.get('labels'),
                    ),
                )

            # Mark the processed issues
            processed_keys = [issue[0] for issue in raw_issues]
            if processed_keys:
                cur.execute(
                    "UPDATE jira_issue_raw SET processed_at = CURRENT_TIMESTAMP WHERE jira_key = ANY(%s)",
                    (processed_keys,),
                )

        conn.commit()
