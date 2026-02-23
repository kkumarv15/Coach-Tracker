# Coaching Tracker App (PostgreSQL Edition)

A web-based coaching CRM for managing coachees, sessions, sources, and analytics — now backed by a **Node.js + PostgreSQL** API.

## What Changed

- Replaced browser LocalStorage persistence with backend API persistence.
- Added Express server (`server.js`) with REST endpoints under `/api/*`.
- Added PostgreSQL schema (`sql/schema.sql`) and DB bootstrap (`src/db.js`).
- Frontend (`app.js`) now performs async API CRUD operations.
- Added `.env.example` for environment configuration.

## Stack

- Frontend: HTML, CSS, Vanilla JavaScript, Chart.js
- Backend: Node.js, Express
- Database: PostgreSQL
- DB Driver: `pg`

## Project Structure

```text
coaching-tracker/
├── app.js
├── index.html
├── styles.css
├── server.js
├── src/
│   └── db.js
├── sql/
│   └── schema.sql
├── .env.example
├── package.json
└── package-lock.json
```

## Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment

Create a `.env` file in project root (you can copy from `.env.example`):

```env
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=coaching_tracker
```

### 3) Create PostgreSQL database

Create the DB manually if it doesn’t exist:

```sql
CREATE DATABASE coaching_tracker;
```

> On startup, the app auto-runs `sql/schema.sql` to create tables/indexes.

### 4) Start app

```bash
npm start
```

Open: `http://localhost:3000`

## Local Troubleshooting (important)

If login appears to “fail” locally, it is usually because backend startup failed due to DB connectivity.

### 1) Verify PostgreSQL client exists

```bash
psql --version
```

If you get `command not found: psql`, install PostgreSQL first.

If installed via Homebrew on Intel Mac, binaries may be at:

```bash
/usr/local/opt/postgresql@14/bin/psql --version
```

### 2) Verify DB server is running

```bash
pg_isready -h 127.0.0.1 -p 5432
```

### 3) Verify connection manually with psql

```bash
PGPASSWORD=postgres psql -h 127.0.0.1 -p 5432 -U postgres -d postgres -c "SELECT 1;"
```

### 4) Create app DB if needed

```bash
PGPASSWORD=postgres psql -h 127.0.0.1 -p 5432 -U postgres -d postgres -c "CREATE DATABASE coaching_tracker;"
```

### 5) Start app

```bash
npm start
```

If PostgreSQL is not reachable, the UI now shows a clear message and login screen remains accessible, but data operations require backend+DB to be up.

## API Endpoints

- Health: `GET /api/health`
- Sources: `GET/POST /api/sources`, `PUT/DELETE /api/sources/:id`
- Coachees: `GET/POST /api/coachees`, `PUT/DELETE /api/coachees/:id`
- Sessions: `GET/POST /api/sessions`, `PUT/DELETE /api/sessions/:id`
- Demo Seed: `POST /api/seed-demo`

## Notes

- Login remains demo-only on frontend (`admin@coach.com / password`).
- Session records are preserved if linked entities are deleted (`ON DELETE SET NULL`).
- Demo seed runs automatically if tables are empty.
