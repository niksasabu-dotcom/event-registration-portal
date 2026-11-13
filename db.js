const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'event_db'
});

db.connect((err) => {
    if (err) {
        console.error('MySQL Connection Error:', err.message);
        return;
    }
    console.log('Connected to MySQL (event_db)');
});

module.exports = db;