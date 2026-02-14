const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { initDatabase, query, withTransaction } = require('./src/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const asyncHandler = (handler) => (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
};

const mapSessionRow = (row) => ({
    id: row.id,
    coacheeId: row.coachee_id,
    coacheeType: row.coachee_type,
    sessionDate: row.session_date instanceof Date ? row.session_date.toISOString().split('T')[0] : row.session_date,
    duration: Number(row.duration),
    theme: Array.isArray(row.theme) ? row.theme : (row.theme || []),
    paymentType: row.payment_type,
    notes: row.notes || '',
    createdOn: row.created_on,
    lastUpdated: row.last_updated
});

const mapCoacheeRow = (row) => ({
    id: row.id,
    type: row.type,
    firstName: row.first_name,
    secondName: row.second_name,
    ageGroup: row.age_group,
    sex: row.sex,
    email: row.email,
    phone: row.phone,
    linkedin: row.linkedin,
    occupation: row.occupation,
    groupTeamName: row.group_team_name,
    numParticipants: row.num_participants,
    members: row.members,
    organisation: row.organisation,
    city: row.city,
    country: row.country,
    sourceId: row.source_id,
    createdOn: row.created_on,
    lastUpdated: row.last_updated
});

const mapSourceRow = (row) => ({
    id: row.id,
    name: row.name,
    country: row.country,
    website: row.website,
    createdOn: row.created_on,
    lastUpdated: row.last_updated
});

app.get('/api/health', asyncHandler(async (req, res) => {
    try {
        await query('SELECT 1');
        res.json({ ok: true, database: 'connected' });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
}));

app.get('/api/sources', asyncHandler(async (req, res) => {
    const result = await query('SELECT * FROM sources ORDER BY created_on ASC');
    res.json(result.rows.map(mapSourceRow));
}));

app.post('/api/sources', asyncHandler(async (req, res) => {
    const { id, name, country, website, createdOn, lastUpdated } = req.body;
    const result = await query(
        `INSERT INTO sources (id, name, country, website, created_on, last_updated)
         VALUES ($1, $2, $3, $4, COALESCE($5::timestamptz, NOW()), COALESCE($6::timestamptz, NOW()))
         RETURNING *`,
        [id, name, country || '', website || '', createdOn || null, lastUpdated || null]
    );
    res.status(201).json(mapSourceRow(result.rows[0]));
}));

app.put('/api/sources/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, country, website } = req.body;
    const result = await query(
        `UPDATE sources
         SET name = $2, country = $3, website = $4, last_updated = NOW()
         WHERE id = $1
         RETURNING *`,
        [id, name, country || '', website || '']
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Source not found' });
    res.json(mapSourceRow(result.rows[0]));
}));

app.delete('/api/sources/:id', asyncHandler(async (req, res) => {
    const result = await query('DELETE FROM sources WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Source not found' });
    res.status(204).send();
}));

app.get('/api/coachees', asyncHandler(async (req, res) => {
    const result = await query('SELECT * FROM coachees ORDER BY created_on ASC');
    res.json(result.rows.map(mapCoacheeRow));
}));

app.post('/api/coachees', asyncHandler(async (req, res) => {
    const c = req.body;
    const result = await query(
        `INSERT INTO coachees (
            id, type, first_name, second_name, age_group, sex, email, phone, linkedin, occupation,
            group_team_name, num_participants, members, organisation, city, country, source_id,
            created_on, last_updated
        ) VALUES (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
            $11,$12,$13,$14,$15,$16,$17,
            COALESCE($18::timestamptz, NOW()), COALESCE($19::timestamptz, NOW())
        ) RETURNING *`,
        [
            c.id, c.type, c.firstName || null, c.secondName || null, c.ageGroup || null, c.sex || null, c.email || null,
            c.phone || null, c.linkedin || null, c.occupation || null, c.groupTeamName || null, c.numParticipants || null,
            c.members || null, c.organisation || null, c.city || null, c.country || null, c.sourceId || null,
            c.createdOn || null, c.lastUpdated || null
        ]
    );
    res.status(201).json(mapCoacheeRow(result.rows[0]));
}));

app.put('/api/coachees/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const c = req.body;
    const result = await query(
        `UPDATE coachees SET
            type = $2,
            first_name = $3,
            second_name = $4,
            age_group = $5,
            sex = $6,
            email = $7,
            phone = $8,
            linkedin = $9,
            occupation = $10,
            group_team_name = $11,
            num_participants = $12,
            members = $13,
            organisation = $14,
            city = $15,
            country = $16,
            source_id = $17,
            last_updated = NOW()
         WHERE id = $1
         RETURNING *`,
        [
            id, c.type, c.firstName || null, c.secondName || null, c.ageGroup || null, c.sex || null,
            c.email || null, c.phone || null, c.linkedin || null, c.occupation || null, c.groupTeamName || null,
            c.numParticipants || null, c.members || null, c.organisation || null, c.city || null, c.country || null,
            c.sourceId || null
        ]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Coachee not found' });
    res.json(mapCoacheeRow(result.rows[0]));
}));

app.delete('/api/coachees/:id', asyncHandler(async (req, res) => {
    const result = await query('DELETE FROM coachees WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Coachee not found' });
    res.status(204).send();
}));

app.get('/api/sessions', asyncHandler(async (req, res) => {
    const result = await query('SELECT * FROM sessions ORDER BY session_date DESC, created_on DESC');
    res.json(result.rows.map(mapSessionRow));
}));

app.post('/api/sessions', asyncHandler(async (req, res) => {
    const s = req.body;
    const result = await query(
        `INSERT INTO sessions (
            id, coachee_id, coachee_type, session_date, duration, theme, payment_type, notes, created_on, last_updated
        ) VALUES (
            $1, $2, $3, $4::date, $5, $6::jsonb, $7, $8, COALESCE($9::timestamptz, NOW()), COALESCE($10::timestamptz, NOW())
        ) RETURNING *`,
        [
            s.id, s.coacheeId, s.coacheeType, s.sessionDate, s.duration, JSON.stringify(s.theme || []), s.paymentType,
            s.notes || '', s.createdOn || null, s.lastUpdated || null
        ]
    );
    res.status(201).json(mapSessionRow(result.rows[0]));
}));

app.put('/api/sessions/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const s = req.body;
    const result = await query(
        `UPDATE sessions
         SET coachee_id = $2,
             coachee_type = $3,
             session_date = $4::date,
             duration = $5,
             theme = $6::jsonb,
             payment_type = $7,
             notes = $8,
             last_updated = NOW()
         WHERE id = $1
         RETURNING *`,
        [id, s.coacheeId, s.coacheeType, s.sessionDate, s.duration, JSON.stringify(s.theme || []), s.paymentType, s.notes || '']
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Session not found' });
    res.json(mapSessionRow(result.rows[0]));
}));

app.delete('/api/sessions/:id', asyncHandler(async (req, res) => {
    const result = await query('DELETE FROM sessions WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Session not found' });
    res.status(204).send();
}));

app.post('/api/seed-demo', asyncHandler(async (req, res) => {
    const { sources = [], coachees = [], sessions = [] } = req.body;
    await withTransaction(async (client) => {
        for (const source of sources) {
            await client.query(
                `INSERT INTO sources (id, name, country, website, created_on, last_updated)
                 VALUES ($1, $2, $3, $4, COALESCE($5::timestamptz, NOW()), COALESCE($6::timestamptz, NOW()))
                 ON CONFLICT (id) DO NOTHING`,
                [source.id, source.name, source.country || '', source.website || '', source.createdOn || null, source.lastUpdated || null]
            );
        }

        for (const c of coachees) {
            await client.query(
                `INSERT INTO coachees (
                    id, type, first_name, second_name, age_group, sex, email, phone, linkedin, occupation,
                    group_team_name, num_participants, members, organisation, city, country, source_id,
                    created_on, last_updated
                ) VALUES (
                    $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
                    $11,$12,$13,$14,$15,$16,$17,
                    COALESCE($18::timestamptz, NOW()), COALESCE($19::timestamptz, NOW())
                ) ON CONFLICT (id) DO NOTHING`,
                [
                    c.id, c.type, c.firstName || null, c.secondName || null, c.ageGroup || null, c.sex || null, c.email || null,
                    c.phone || null, c.linkedin || null, c.occupation || null, c.groupTeamName || null, c.numParticipants || null,
                    c.members || null, c.organisation || null, c.city || null, c.country || null, c.sourceId || null,
                    c.createdOn || null, c.lastUpdated || null
                ]
            );
        }

        for (const s of sessions) {
            await client.query(
                `INSERT INTO sessions (
                    id, coachee_id, coachee_type, session_date, duration, theme, payment_type, notes, created_on, last_updated
                ) VALUES (
                    $1, $2, $3, $4::date, $5, $6::jsonb, $7, $8, COALESCE($9::timestamptz, NOW()), COALESCE($10::timestamptz, NOW())
                ) ON CONFLICT (id) DO NOTHING`,
                [
                    s.id, s.coacheeId, s.coacheeType, s.sessionDate, s.duration, JSON.stringify(s.theme || []),
                    s.paymentType, s.notes || '', s.createdOn || null, s.lastUpdated || null
                ]
            );
        }
    });
    res.status(201).json({ ok: true });
}));

app.use((error, req, res, next) => {
    console.error(error);
    if (res.headersSent) return next(error);
    res.status(500).json({ error: error.message || 'Internal server error' });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const start = async () => {
    try {
        await initDatabase();
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

start();
