# Data Model: Jira Roadmap Visualization Web App

## Entities

### RoadmapItem (Epic)
- id: string (Jira Epic ID)
- url: string (web link to the item)
- name: string
- status: string
- roadmap_state: string
- labels: list[string] (Ubuntu release cycles)
- parent: string (Objective ID)
- components: list[string]
- department: string
- team: string
- product: string
- created_at: datetime
- updated_at: datetime

#### Validation Rules
- status must be one of: Done, In Progress, In Review, To Be Deployed, BLOCKED, Rejected, Untriaged, Triaged
- roadmap_state must be one of: At Risk, Excluded, Added, Dropped, or empty
- labels must match release cycle format: NN.NN (e.g., 24.04)
- Only items with Properties: Roadmap Item are included

### Product
- name: string
- primary_project: string
- secondary_projects: list[string]
- component_filter: list[string]

### Department
- name: string
- teams: list[string]

### Team
- name: string
- department: string

### ReleaseCycle
- name: string (e.g., 24.04)
- start_date: date
- end_date: date

### Objective
- id: string
- name: string
- description: string
- url: string

## Relationships
- RoadmapItem belongs to one Product, one Department, one Team, one Objective
- Product aggregates RoadmapItems from multiple projects/components
- Department has many Teams
- Team has many RoadmapItems
- ReleaseCycle is referenced by RoadmapItem.labels
