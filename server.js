const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 1. INSERT: Register an attendee
app.post('/api/registrations', (req, res) => {
    const { participant_name, email, event_name, ticket_type } = req.body;

    if (!participant_name || !email || !event_name || !ticket_type) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = 'INSERT INTO registrations (participant_name, email, event_name, ticket_type) VALUES (?, ?, ?, ?)';
    db.query(sql, [participant_name, email, event_name, ticket_type], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database insert failed' });
        }
        res.status(201).json({ message: 'Registration successful!', id: result.insertId });
    });
});

// 2. DISPLAY/VIEW: Get all registrations
app.get('/api/registrations', (req, res) => {
    const sql = 'SELECT * FROM registrations ORDER BY id DESC';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
        res.status(200).json(results);
    });
});

// 3. DELETE: Cancel/remove a registration
app.delete('/api/registrations/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM registrations WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete record' });
        }
        res.status(200).json({ message: 'Registration removed' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});