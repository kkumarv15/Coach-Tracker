-- Client Prospects Table for The Sharpeners
CREATE TABLE IF NOT EXISTS client_prospects (
    id TEXT PRIMARY KEY,
    client_name TEXT NOT NULL,
    gender TEXT CHECK (gender IN ('M', 'F', 'Male', 'Female')),
    age_group TEXT,
    city TEXT,
    country TEXT,
    role TEXT,
    company TEXT,
    industry_sector TEXT,
    linkedin_link TEXT,
    source TEXT,
    mobile TEXT,
    email TEXT,
    created_on TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_client_prospects_company ON client_prospects(company);
CREATE INDEX IF NOT EXISTS idx_client_prospects_source ON client_prospects(source);
CREATE INDEX IF NOT EXISTS idx_client_prospects_country ON client_prospects(country);
