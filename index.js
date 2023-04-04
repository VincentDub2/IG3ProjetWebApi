const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Configure middleware for handling JSON data
app.use(express.json());

// Allow cross-origin requests (replace '*' with your domain)
app.use(cors({ origin: '*' }));

// Create a MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USE,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
