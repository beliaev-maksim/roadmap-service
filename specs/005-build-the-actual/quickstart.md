# Quickstart: Jira Integration

This guide provides instructions on how to set up and run the Jira integration feature.

## Prerequisites

- Docker and Docker Compose
- Python 3.11
- A Jira instance with a project containing some Epics.
- A Jira personal access token (PAT).

## Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/beliaev-maksim/roadmap-service.git
    cd roadmap-service
    ```

2.  **Create a `.env` file** in the `backend` directory and add the following environment variables:
    ```
    JIRA_URL=https://your-jira-instance.atlassian.net
    JIRA_USERNAME=your-jira-username
    JIRA_PAT=your-jira-personal-access-token
    JIRA_PROJECT_KEY=YOUR_PROJECT_KEY
    JQL_QUERY='project = "YOUR_PROJECT_KEY" AND issuetype = Epic'
    DATABASE_URL=postgresql://user:password@localhost:5432/roadmap
    ```

3.  **Build and run the application** using Docker Compose:
    ```bash
    docker-compose up --build
    ```

## Usage

1.  **Trigger a Jira sync**:
    - The application will automatically sync with Jira every 5 minutes.
    - To trigger a manual sync, you can send a POST request to the `/api/sync` endpoint.

2.  **View the roadmap**:
    - Open your browser and navigate to `http://localhost:3000`.
    - You should see the roadmap items fetched from your Jira project.
