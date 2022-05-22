require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes/routes');

app.use(express.static('public'))
app.use('/api/cacestcool/', routes);

module.exports = app;