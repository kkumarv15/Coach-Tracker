const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// Support both individual params and full connection string (for Supabase)
const pool = new Pool({
    // If DATABASE_URL is provided (e.g., Supabase), use it directly
    connectionString: process.env.DATABASE_URL || undefined,
    // Fallback to individual params for local development
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'coaching_tracker',
    // Supabase requires SSL
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

const query = (text, params = []) => pool.query(text, params);

const withTransaction = async (work) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await work(client);
        await client.query('COMMIT');
        return result;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

const initDatabase = async () => {
    const schemaPath = path.join(__dirname, '..', 'sql', 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf-8');
    await pool.query(schemaSql);
    
    // Load client_prospects schema if exists
    const clientProspectsPath = path.join(__dirname, '..', 'sql', 'client_prospects.sql');
    if (fs.existsSync(clientProspectsPath)) {
        const clientProspectsSql = fs.readFileSync(clientProspectsPath, 'utf-8');
        await pool.query(clientProspectsSql);
    }
};

module.exports = {
    query,
    initDatabase,
    withTransaction
};
