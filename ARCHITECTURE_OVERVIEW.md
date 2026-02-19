# Coaching Tracker — Architecture Overview (Backend + PostgreSQL)

## Application Architecture Diagram

```mermaid
flowchart TB
    subgraph CLIENT["🌐 Client Layer"]
        direction LR
        BROWSER[("Browser")]
        HTML[index.html]
        CSS[styles.css]
        JS[app.js]
        CHART[Chart.js<br/>via CDN]
    end

    subgraph SERVER["⚙️ Server Layer (Node.js/Express)"]
        direction TB
        API[("Express API<br/>/api/*")]
        MIDDLEWARE[("Middleware<br/>CORS, JSON, Static")]
        ROUTES[("Routes<br/>CRUD + Seed")]
    end

    subgraph DATA["💾 Data Layer"]
        direction TB
        DAL[src/db.js]
        POOL[("pg Pool<br/>Connection Pool")]
        DB[(PostgreSQL)]
        SCHEMA[sql/schema.sql]
    end

    subgraph AUTH["🔐 Authentication"]
        LOGIN[("Demo Login<br/>localStorage")]
    end

    %% Client connections
    BROWSER --> HTML
    HTML --> CSS
    HTML --> JS
    JS --> CHART

    %% Client to Server
    JS -->|HTTP/Fetch| API

    %% Server connections
    API --> MIDDLEWARE
    MIDDLEWARE --> ROUTES
    ROUTES --> DAL
    DAL --> POOL
    POOL --> DB
    DAL --> SCHEMA

    %% Auth connections
    JS --> LOGIN

    %% Styling
    style CLIENT fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style SERVER fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    style DATA fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style AUTH fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
```

## System Components

| Component | File | Description |
|-----------|------|-------------|
| **Frontend UI** | `index.html` | Main HTML structure |
| **Styling** | `styles.css` | CSS styles |
| **Application Logic** | `app.js` | CoachingTracker class - all client-side logic |
| **Charts** | Chart.js (CDN) | Data visualization |
| **Backend Server** | `server.js` | Express server, API routes |
| **Database Layer** | `src/db.js` | PostgreSQL connection & queries |
| **Database Schema** | `sql/schema.sql` | Table definitions |
| **Authentication** | Demo Login | Browser-based demo auth |

## Database Schema

```mermaid
erDiagram
    SOURCES {
        string id PK
        string name
        string country
        string website
        timestamptz created_on
        timestamptz last_updated
    }

    COACHEES {
        string id PK
        string type
        string first_name
        string second_name
        string age_group
        string sex
        string email
        string phone
        string linkedin
        string occupation
        string group_team_name
        int num_participants
        string members
        string organisation
        string city
        string country
        string source_id FK
        timestamptz created_on
        timestamptz last_updated
    }

    SESSIONS {
        string id PK
        string coachee_id FK
        string coachee_type
        date session_date
        numeric duration
        jsonb theme
        string payment_type
        text notes
        timestamptz created_on
        timestamptz last_updated
    }

    SOURCES ||--o{ COACHEES : "source_id"
    COACHEES ||--o{ SESSIONS : "coachee_id"
```

## API Endpoints

```mermaid
flowchart LR
    subgraph ENDPOINTS["API Endpoints"]
        HEALTH["GET /api/health"]
        SOURCES["Sources CRUD<br/>/api/sources"]
        COACHEES["Coachees CRUD<br/>/api/coachees"]
        SESSIONS["Sessions CRUD<br/>/api/sessions"]
        SEED["POST /api/seed-demo"]
    end

    CLIENT --> HEALTH
    CLIENT --> SOURCES
    CLIENT --> COACHEES
    CLIENT --> SESSIONS
    CLIENT --> SEED
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Database connectivity check |
| GET/POST/PUT/DELETE | `/api/sources` | Source CRUD operations |
| GET/POST/PUT/DELETE | `/api/coachees` | Coachee CRUD operations |
| GET/POST/PUT/DELETE | `/api/sessions` | Session CRUD operations |
| POST | `/api/seed-demo` | Seed demo data |

## Runtime Flow

```mermaid
sequenceDiagram
    participant Browser
    participant Express
    participant app.js
    participant API
    participant DB

    Browser->>Express: Request index.html
    Express->>Browser: HTML + CSS + JS
    
    Browser->>app.js: Initialize CoachingTracker
    app.js->>API: GET /api/sources, /api/coachees, /api/sessions
    
    API->>DB: Query tables
    DB->>API: Return data
    API->>app.js: JSON response
    
    alt Database empty
        app.js->>API: POST /api/seed-demo
        API->>DB: Insert demo records
        DB->>API: Confirm
        API->>app.js: Success
        app.js->>API: Reload data
    end
    
    app.js->>Browser: Render Dashboard
```

---

# CI/CD Architecture — GitHub Actions

## Pipeline Overview

This document describes the continuous integration and continuous deployment (CI/CD) pipeline implemented using GitHub Actions for the Coaching Tracker application.

## CI/CD Architecture Diagram

```mermaid
flowchart TB
    subgraph CODE["📝 Code Stage"]
        DEV[("Developer<br/>Pushes Code")]
        REPO[("GitHub<br/>Repository")]
    end

    subgraph CI["🔄 CI Pipeline - GitHub Actions"]
        direction TB
        CHECKOUT[("1. Checkout<br/>Code")]
        DEP_INSTALL[("2. Install<br/>Dependencies")]
        LINT[("3. Lint<br/>Code")]
        TEST[("4. Run<br/>Tests")]
        SEC_SCAN[("5. Security<br/>Scans")]
        BUILD[("6. Build<br/>App")]
        ARTIFACT[("7. Create<br/>Artifacts")]
    end

    subgraph CD["🚀 CD Pipeline"]
        DB_MIGRATE[("8. Database<br/>Migration")]
        DEPLOY_STAGING[("9. Deploy to<br/>Staging")]
        SMOKE_TEST[("10. Smoke<br/>Tests")]
        DEPLOY_PROD[("11. Deploy to<br/>Production")]
        NOTIFY[("12. Notify<br/>& Monitor")]
    end

    subgraph ENVIRONMENTS["🏢 Environments"]
        STAGING[("Staging<br/>Environment")]
        PROD[("Production<br/>Environment")]
    end

    %% Code Flow
    DEV -->|git push| REPO
    REPO -->|Webhook Trigger| CI

    %% CI Flow
    CI --> CHECKOUT
    CHECKOUT --> DEP_INSTALL
    DEP_INSTALL --> LINT
    LINT --> TEST
    TEST --> SEC_SCAN
    SEC_SCAN --> BUILD
    BUILD --> ARTIFACT

    %% CD Flow
    ARTIFACT --> DB_MIGRATE
    DB_MIGRATE --> DEPLOY_STAGING
    DEPLOY_STAGING --> SMOKE_TEST
    SMOKE_TEST -->|Success| DEPLOY_PROD
    SMOKE_TEST -->|Failure| ROLLBACK[("Rollback")]
    DEPLOY_PROD --> NOTIFY

    %% Environment Connections
    DEPLOY_STAGING -.->|Deploy| STAGING
    DEPLOY_PROD -.->|Deploy| PROD

    %% Styling
    style CI fill:#e1f5fe,stroke:#0277bd,stroke-width:2px
    style CD fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    style ENVIRONMENTS fill:#fff3e0,stroke:#e65100,stroke-width:2px
```

## Detailed Pipeline Stages

### 1. Code Checkout
```yaml
- name: Checkout code
  uses: actions/checkout@v4
```

### 2. Install Dependencies
```yaml
- name: Install Node.js dependencies
  run: npm ci
```

### 3. Lint & Code Quality
- **ESLint** - JavaScript linting
- **Code formatting check** - Prettier
```yaml
- name: Run ESLint
  run: npm run lint
```

### 4. Run Tests
- Unit tests for API endpoints
- Integration tests for database operations
```yaml
- name: Run tests
  run: npm test
```

### 5. Security Scans
| Tool | Purpose | Check |
|------|---------|-------|
| **npm audit** | Dependency vulnerabilities | Known CVEs |
| **Snyk** | Deep dependency analysis | Security issues |
| **OWASP Dependency-Check** | JavaScript dependencies | Vulnerabilities |
| **SonarCloud** | Code quality & security | Code smells |

### 6. Build Application
```yaml
- name: Build the application
  run: npm run build
```

### 7. Create Artifacts
- Package build artifacts
- Store for deployment stages

---

## Database Migration Pipeline

```mermaid
flowchart LR
    subgraph MIGRATE["Database Migration Flow"]
        SCHEMA[("sql/schema.sql")]
        MIGRATOR[("Migration<br/>Script")]
        CHECK[("Check<br/>Pending")]
        RUN[("Run<br/>Migration")]
        VERIFY[("Verify<br/>Schema")]
    end

    SCHEMA --> MIGRATOR
    MIGRATOR --> CHECK
    CHECK -->|Has changes| RUN
    CHECK -->|No changes| SKIP[("Skip")]
    RUN --> VERIFY
```

### Migration Strategy

1. **Version Control**: Schema changes in `sql/schema.sql`
2. **Migration Runner**: Automated via GitHub Actions
3. **Rollback Support**: Keep previous schema versions
4. **Health Check**: Verify database connectivity

```yaml
# Database Migration Step
- name: Run Database Migrations
  run: |
    npm run db:migrate
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

---

## Deployment Flow

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant GitHub as GitHub Actions
    participant Staging as Staging Server
    participant Prod as Production Server

    Dev->>GitHub: Push Code
    GitHub->>GitHub: CI Pipeline (Test, Build, Scan)
    
    alt CI Passes
        GitHub->>Staging: Deploy to Staging
        Staging->>GitHub: Smoke Tests Pass
        GitHub->>Prod: Deploy to Production
        Prod->>GitHub: Deployment Successful
        GitHub->>Dev: Notify Success
    else CI Fails
        GitHub->>Dev: Notify Failure
    end
```

### Environments

| Environment | Purpose | URL | Trigger |
|-------------|---------|-----|---------|
| **Staging** | Pre-production testing | staging.coaching-tracker.app | On PR merge |
| **Production** | Live application | coaching-tracker.app | Manual approval |

---

## Security Implementation

```mermaid
flowchart TB
    subgraph SEC["🔒 Security Pipeline"]
        SAST[("SAST<br/>Static Analysis")]
        SCA[("SCA<br/>Dependency Scan")]
        DAST[("DAST<br/>Dynamic Scan")]
        SECRETS[("Secrets<br/>Detection")]
    end

    SAST -->|Find issues| SCA
    SCA -->|Analyze deps| DAST
    DAST -->|Test running| SECRETS
    SECRETS -->|No secrets| PASS[("Pass"))]
    SECRETS -->|Secrets found| FAIL[("Fail Pipeline")]

    style SEC fill:#ffebee,stroke:#c62828,stroke-width:2px
```

### Security Tools

1. **CodeQL** - Static application security testing
2. **npm audit** - Node.js vulnerability scanning
3. **TruffleHog** - Secret detection in code
4. **OWASP ZAP** - Dynamic security testing (optional)

---

## GitHub Actions Workflow

### `.github/workflows/ci-cd.yml`

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20.x'

jobs:
  # ============== CI JOBS ==============
  lint:
    name: Lint & Code Quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npm run lint

  test:
    name: Unit & Integration Tests
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: coaching_test
        ports:
          - 5432:5432
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npm test
        env:
          DATABASE_URL: postgres://test:test@localhost:5432/coaching_test

  security-scan:
    name: Security Scans
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run npm audit
        run: npm audit --audit-level=high
      - name: Run Snyk
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

  build:
    name: Build Application
    runs-on: ubuntu-latest
    needs: [lint, test, security-scan]
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build-artifacts
          path: dist/

  # ============== CD JOBS ==============
  deploy-staging:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    needs: [build]
    environment: staging
    steps:
      - name: Download artifacts
        uses: actions/download-artifact@v4
        with:
          name: build-artifacts
      - name: Deploy to Staging
        run: |
          echo "Deploying to staging..."
          # Add your deployment commands here
      - name: Run Smoke Tests
        run: |
          npm run test:smoke

  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: [deploy-staging]
    environment: production
    steps:
      - name: Download artifacts
        uses: actions/download-artifact@v4
        with:
          name: build-artifacts
      - name: Run Database Migrations
        run: npm run db:migrate
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
      - name: Deploy to Production
        run: |
          echo "Deploying to production..."
          # Add your deployment commands here
      - name: Notify
        if: always()
        run: |
          echo "Deployment completed"
```

---

## Complete CI/CD Flow Summary

```mermaid
flowchart TD
    START(("Code<br/>Push")) --> CHECK{Valid<br/>Push?}
    
    CHECK -->|No| IGNORE[("Ignore")]
    CHECK -->|Yes| CLONE[("Clone<br/>Repo")]
    
    CLONE --> INSTALL[("Install<br/>Deps")]
    INSTALL --> ANALYZE{Analysis<br/>Pass?}
    
    ANALYZE -->|No| FAIL_CI[("CI Failed<br/>Notify Dev")]
    ANALYZE -->|Yes| SCAN{Security<br/>Scan Pass?}
    
    SCAN -->|No| FAIL_SEC[("Security<br/>Issue Found")]
    SCAN -->|Yes| BUILD[("Build<br/>App")]
    
    BUILD --> PACK[("Package<br/>Artifacts")]
    PACK --> STAGING[("Deploy<br/>Staging")]
    
    STAGING --> TEST_STAGING{Staging<br/>Tests Pass?}
    TEST_STAGING -->|No| ROLLBACK_STAGING[("Rollback<br/>Staging")]
    TEST_STAGING -->|Yes| MANUAL{Manual<br/>Approval?}
    
    MANUAL -->|No| WAIT[("Wait for<br/>Approval")]
    MANUAL -->|Yes| MIGRATE[("DB<br/>Migration")]
    
    MIGRATE --> PRODUCTION[("Deploy<br/>Production")]
    PRODUCTION --> TEST_PROD{Production<br/>Healthy?}
    
    TEST_PROD -->|No| ROLLBACK_PROD[("Rollback<br/>Production")]
    TEST_PROD -->|Yes| SUCCESS[("Success<br/>Notify")]
    
    FAIL_CI --> IGNORE
    FAIL_SEC --> IGNORE
    ROLLBACK_STAGING --> IGNORE
    ROLLBACK_PROD --> IGNORE
    WAIT --> MANUAL
    SUCCESS --> END(("Complete"))
    
    style START fill:#e3f2fd,stroke:#1565c0
    style SUCCESS fill:#c8e6c9,stroke:#2e7d32
    style FAIL_CI fill:#ffcdd2,stroke:#c62828
    style FAIL_SEC fill:#ffcdd2,stroke:#c62828
    style ROLLBACK_STAGING fill:#fff3e0,stroke:#e65100
    style ROLLBACK_PROD fill:#fff3e0,stroke:#e65100
```

---

## Monitoring & Notifications

| Event | Channel | Message |
|-------|---------|---------|
| CI Failed | GitHub/PR Comment | Failed tests, lint errors |
| Security Found | Slack/Email | Vulnerability details |
| Staging Deployed | GitHub | Deployment URL |
| Production Deployed | Slack/Email | Deployment complete |
| Production Failed | Slack/Email + PagerDuty | Immediate alert |

---

## Secrets Management

```yaml
# GitHub Secrets Configuration
secrets:
  - DATABASE_URL          # Production database connection
  - DATABASE_URL_STAGING # Staging database connection
  - SNYK_TOKEN          # Snyk security scanning
  - DEPLOY_TOKEN        # SSH/Deployment token
  - SLACK_WEBHOOK       # Slack notifications
```
