# Data Model: Roadmap

## Entities

### RoadmapItem

Represents a single item on the roadmap, sourced from a Jira issue.

| Field | Type | Description | Validation Rules |
|---|---|---|---|
| `id` | Integer | Primary key. | Not nullable, unique. |
| `jira_key` | String | The key of the Jira issue (e.g., "PROJ-123"). | Not nullable, unique. |
| `title` | String | The title of the roadmap item. | Not nullable. |
| `description` | String | A detailed description of the roadmap item. | Nullable. |
| `status` | String | The current status of the roadmap item (e.g., "To Do", "In Progress", "Done"). | Not nullable. |
| `release` | String | The target release for the roadmap item. | Nullable. |
| `tags` | Array of Strings | A list of tags associated with the roadmap item. | Nullable. |
| `created_at` | DateTime | The timestamp when the item was created in the database. | Not nullable. |
| `updated_at` | DateTime | The timestamp when the item was last updated in the database. | Not nullable. |

## Relationships

- A `RoadmapItem` is a standalone entity and does not have any direct relationships with other entities in this data model.

## State Transitions

The `status` of a `RoadmapItem` can transition between the following states:

- To Do
- In Progress
- Done

The exact status values will be determined by the values in the Jira `status.name` field.
