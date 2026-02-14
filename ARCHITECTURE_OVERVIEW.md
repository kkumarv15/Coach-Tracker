# Coaching Tracker — Architecture Overview (Backend + PostgreSQL)

## Diagram

```mermaid
flowchart LR
    U[Coach User (Browser)] --> UI[index.html + styles.css]
    UI --> FE[app.js / CoachingTracker]
    FE --> API[/Express API\nserver.js\n/api/*/]
    API --> DB[(PostgreSQL)]
    API --> SCHEMA[sql/schema.sql]
    API --> DAL[src/db.js]

    FE --> AUTH[Demo Login in Browser]
    FE --> CHART[Chart.js]
```

## Runtime Flow

1. Browser loads static assets from Express.
2. `app.js` initializes and fetches `sources`, `coachees`, `sessions` via `/api`.
3. If DB is empty, frontend triggers `/api/seed-demo`.
4. All add/edit/delete actions call API endpoints and persist to PostgreSQL.
5. Dashboard and lookup views compute analytics client-side from API-loaded data.

## Data Layer

- DB connection and bootstrap logic: `src/db.js`
- Schema initialization: `sql/schema.sql`
- Tables:
  - `sources`
  - `coachees`
  - `sessions`

## API Responsibilities

- CRUD for sources, coachees, sessions
- Health endpoint for connectivity checks
- Demo seed endpoint with transactional inserts
- Error handling middleware for standardized JSON errors
