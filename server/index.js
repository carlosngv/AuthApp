const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const { dbConnection } = require('./db/config');

// DB

dbConnection();


// Middlewares
app.use(express.static('public'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));

app.use('*', (req, res) => {
    res.sendFile(__dirname + 'public' );
});

app.listen( process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
