CREATE TABLE IF NOT EXISTS sources (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    country TEXT,
    website TEXT,
    created_on TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS coachees (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('Individual', 'Group', 'Team')),
    first_name TEXT,
    second_name TEXT,
    age_group TEXT,
    sex TEXT,
    email TEXT,
    phone TEXT,
    linkedin TEXT,
    occupation TEXT,
    group_team_name TEXT,
    num_participants INTEGER,
    members TEXT,
    organisation TEXT,
    city TEXT,
    country TEXT,
    source_id TEXT REFERENCES sources(id) ON DELETE SET NULL,
    created_on TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    coachee_id TEXT REFERENCES coachees(id) ON DELETE SET NULL,
    coachee_type TEXT NOT NULL CHECK (coachee_type IN ('Individual', 'Group', 'Team')),
    session_date DATE NOT NULL,
    duration NUMERIC(6,2) NOT NULL CHECK (duration > 0),
    theme JSONB NOT NULL DEFAULT '[]'::jsonb,
    payment_type TEXT NOT NULL CHECK (payment_type IN ('Paid', 'Pro Bono', 'Peer')),
    notes TEXT,
    created_on TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_coachees_source_id ON coachees(source_id);
CREATE INDEX IF NOT EXISTS idx_sessions_coachee_id ON sessions(coachee_id);
CREATE INDEX IF NOT EXISTS idx_sessions_date ON sessions(session_date);
