const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
    // Use IPv4 loopback by default to avoid localhost -> ::1 issues on some systems
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'coaching_tracker'
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
};

module.exports = {
    query,
    initDatabase,
    withTransaction
};
