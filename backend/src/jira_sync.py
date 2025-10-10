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

def get_product_mapping(cursor):
    """Fetches the product to Jira project mapping from the database."""
    cursor.execute("SELECT name, primary_project FROM product")
    return {row[1]: row[0] for row in cursor.fetchall()}

def calculate_epic_color(issue_fields):
    """Calculate color status for an epic based on health and carry-over rules."""
    labels = issue_fields.get('labels', []) or []
    status = issue_fields.get('status', {}).get('name', '')
    # Assuming 'roadmap_state' is a custom field. Adjust if necessary.
    state = issue_fields.get('customfield_10968', {}).get('value') if issue_fields.get('customfield_10968') else None

    carry_over = None
    if isinstance(labels, list) and len(labels) > 1:
        carry_over = {'color': 'purple', 'count': len(labels) - 1}

    color_map = {
        'At Risk': 'orange',
        'Excluded': 'red',
        'Added': 'blue',
        'Dropped': 'black',
    }

    if state:
        return {'carry_over': carry_over, 'health': {'color': color_map.get(state, 'white')}}
    if status == 'Done':
        return {'carry_over': carry_over, 'health': {'color': 'green', 'label': 'C'}}
    if status == 'Rejected':
        return {'carry_over': carry_over, 'health': {'color': 'red'}}
    if status in ('In Progress', 'In Review', 'To Be Deployed', 'BLOCKED'):
        return {'carry_over': carry_over, 'health': {'color': 'green'}}
    
    return {'carry_over': carry_over, 'health': {'color': 'white'}}

def process_raw_jira_data():
    """
    Processes the raw Jira data from the jira_issue_raw table and populates the
    roadmap_item table.
    """
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            product_mapping = get_product_mapping(cur)
            cur.execute("SELECT jira_key, raw_data FROM jira_issue_raw WHERE processed_at IS NULL")
            raw_issues = cur.fetchall()

            for jira_key, raw_data in raw_issues:
                issue_fields = raw_data['fields']
                jira_project = jira_key.split('-')[0]
                product = product_mapping.get(jira_project, 'Uncategorized')

                color_status = calculate_epic_color(issue_fields)
                jira_url = f"{JIRA_URL}/browse/{jira_key}"

                cur.execute(
                    """
                    INSERT INTO roadmap_item (jira_key, title, description, status, release, tags, product, color_status, url)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                    ON CONFLICT (jira_key) DO UPDATE SET
                        title = EXCLUDED.title,
                        description = EXCLUDED.description,
                        status = EXCLUDED.status,
                        release = EXCLUDED.release,
                        tags = EXCLUDED.tags,
                        product = EXCLUDED.product,
                        color_status = EXCLUDED.color_status,
                        url = EXCLUDED.url,
                        updated_at = CURRENT_TIMESTAMP;
                    """,
                    (
                        jira_key,
                        issue_fields.get('summary'),
                        issue_fields.get('description'),
                        issue_fields.get('status', {}).get('name'),
                        issue_fields.get('fixVersions', [{}])[0].get('name') if issue_fields.get('fixVersions') else None,
                        issue_fields.get('labels'),
                        product,
                        json.dumps(color_status),
                        jira_url,
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
