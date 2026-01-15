const { Pool } = require('pg');
require('dotenv').config({ path: '.env' }); // Load from .env

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function initDB() {
    try {
        const client = await pool.connect();
        try {
            console.log('Creating bookings table...');
            await client.query(`
        CREATE TABLE IF NOT EXISTS bookings (
          id SERIAL PRIMARY KEY,
          timestamp TEXT,
          branch TEXT,
          date TEXT,
          time TEXT,
          guests TEXT,
          name TEXT,
          phone TEXT,
          email TEXT,
          status TEXT
        );
      `);
            console.log('Bookings table created successfully.');
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('Error creating table:', err);
    } finally {
        pool.end();
    }
}

initDB();
