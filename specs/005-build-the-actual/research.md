# Research: Jira Integration

## 1. JQL Query for Roadmap Data

**Decision**: The JQL query to fetch roadmap data will be configurable via an environment variable. A default query will be provided that fetches all Epics from a specific project.

**Rationale**: Making the JQL query configurable provides flexibility to adapt to different Jira project configurations without changing the code. A default query makes the feature usable out-of-the-box for common use cases.

**Default Query**: `project = "YOUR_PROJECT_KEY" AND issuetype = Epic`

**Alternatives considered**: Hardcoding the JQL query. This was rejected because it would make the application less flexible and harder to adapt to different Jira setups.

## 2. Jira Issue Field Mapping

**Decision**: A standard, predefined mapping will be used to map Jira issue fields to the roadmap data model.

**Rationale**: A standard mapping is simpler to implement and maintain than a configurable mapping. It also ensures consistency in how data is represented in the application. The mapping can be extended in the future if needed.

**Mapping**:

| Jira Field | Roadmap Item Field |
|---|---|
| `summary` | `title` |
| `description` | `description` |
| `status.name` | `status` |
| `fixVersions[0].name` | `release` |
| `labels` | `tags` |

## 3. Authentication with Jira API

**Decision**: Authentication with the Jira API will be done using a personal access token (PAT). The token will be stored in an environment variable.

**Rationale**: Using a PAT is a simple and secure way to authenticate with the Jira API. It is more secure than using a username and password, and it is easier to manage than OAuth for a server-to-server integration.

**Alternatives considered**:
- **Basic Authentication (username/password)**: Rejected because it is less secure than using a PAT.
- **OAuth**: Rejected because it is more complex to implement and is not necessary for a server-to-server integration.
