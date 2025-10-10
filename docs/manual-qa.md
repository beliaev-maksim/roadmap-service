# Manual QA: Jira Integration

This document provides instructions on how to perform manual quality assurance for the Jira integration feature.

## Prerequisites

- Docker and Docker Compose
- A Jira instance with a project containing some Epics.
- A Jira personal access token (PAT).

## Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/beliaev-maksim/roadmap-service.git
    cd roadmap-service
    ```

2.  **Create a `.env` file** in the root of the project (the same directory as `docker-compose.yml`) and add the following environment variables:
    ```
    JIRA_URL=https://your-jira-instance.atlassian.net
    JIRA_USERNAME=your-jira-username
    JIRA_PAT=your-jira-personal-access-token
    JIRA_PROJECT_KEY=YOUR_PROJECT_KEY
    JQL_QUERY='project = "YOUR_PROJECT_KEY" AND issuetype = Epic'
    DATABASE_URL=postgresql://user:password@localhost:5432/roadmap
    ```
    **Note**: `docker-compose` will automatically read this `.env` file and provide the variables to the services.

3.  **Build and run the application** using Docker Compose:
    ```bash
    docker-compose up --build
    ```
    **Note**: The first time you run this command, it will automatically create the necessary database tables based on the `backend/src/db_schema.sql` file.

## Manual Verification Steps

1.  **Trigger a Jira sync**:
    - Open a terminal and run the following command to trigger a manual sync:
      ```bash
      curl -X POST http://localhost:8000/api/sync
      ```
    - You should see the following response:
      ```json
      {"message":"Jira sync started in the background."}
      ```

2.  **View the roadmap**:
    - Open your browser and navigate to `http://localhost:3000`.
    - You should see the roadmap items fetched from your Jira project.

3.  **Verify data updates**:
    - In your Jira project, update an Epic (e.g., change its status or summary).
    - Trigger another manual sync using the `curl` command from step 1.
    - Refresh the roadmap page in your browser.
    - You should see the updated information reflected in the roadmap.
