const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { swaggerUi, specs } = require('./swaggerConfig');
const functionRoutes = require('./routes/functionRoutes');
const connectDB = require('./config/db');

const app = express();

app.use(bodyParser.json());
app.use('/api/functions', functionRoutes);

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

mongoose.connect('mongodb://localhost:27017/sportspulse', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
