const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { swaggerUi, specs } = require('./swaggerConfig');
const functionRoutes = require('./routes/functionRoutes');
const connectDB = require('./config/db');

const app = express();

app.use(bodyParser.json());

connectDB();

app.use('/api/functions', functionRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;
