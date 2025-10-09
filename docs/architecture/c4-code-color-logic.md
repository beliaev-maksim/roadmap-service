# C4: Code - Roadmap Item Color Logic

This document details the business logic for calculating the color of a roadmap item (epic), as implemented in the `services.py` file.

[Previous: C3 Backend Components](./c3-components-backend.md)

## Overview

The color of a roadmap item is determined by two factors: its **health** and whether it is a **carry-over** item from a previous cycle.

## 1. Carry-Over Status

A roadmap item is considered a "carry-over" if it has more than one release label attached to it.

-   **Rule**: If `len(labels) > 1`, the item gets a `purple` carry-over indicator.
-   **Implementation**: The `carry_over` object in the response will contain `{ "color": "purple", "count": N }`, where `N` is the number of extra labels.

## 2. Health Status

The health status determines the main color of the roadmap item. The logic is evaluated in the following order of precedence:

| Priority | Condition | Health Color | Label | Notes |
|---|---|---|---|---|
| 1 | `status` is `Done` | `green` | `C` | This is the highest priority rule. |
| 2 | `roadmap_state` has a value | Mapped from state | - | See mapping table below. |
| 3 | `status` is `Rejected` | `red` | - | |
| 4 | `status` is `In Progress`, `In Review`, `To Be Deployed`, or `BLOCKED` | `green` | - | |
| 5 | (Default) | `white` | - | Fallback color if no other rules match. |

### Roadmap State to Color Mapping

When a `roadmap_state` is present, it uses the following color mapping:

| `roadmap_state` | Health Color |
|---|---|
| `At Risk` | `orange` |
| `Excluded` | `red` |
| `Added` | `blue` |
| `Dropped` | `black` |

Any other `roadmap_state` value will default to `white`.
