const express = require('express');
const app = new express();
const { Client } = require('pg');

const port = process.env.PORT || 1000;
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/api/date', async (req, res) => {
    const client = new Client({
        connectionString: process.env.CONNECTION_STRING || 'postgresql://postgres:postgres@localhost:5432/postgres'
    });

    await client.connect();

    const result = await client.query('SELECT now() as date');
    await client.end();
    res.json({
        result: result.rows[0]
    });
});

app.get('/', (req, res) => res.render('<h1>Test Fine</h1>'))
app.listen(port, () => console.log(`Application is running on port ${port}`));