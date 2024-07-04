const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const functionRoutes = require('../routes/functionRoutes');
const connectDB = require('../config/db');
const { expect } = require('chai');

const app = express();
app.use(bodyParser.json());
app.use('/api/functions', functionRoutes);

describe('Function Routes Tests', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });

  it('should create a new function', async () => {
    const functionData = {
      name: 'Test Function',
      description: 'This is a test function',
    };

    const res = await request(app)
      .post('/api/functions')
      .send(functionData)
      .expect(200);

    console.log('Response:', res.body);

    expect(res.body).to.have.property('name', 'Test Function');
    expect(res.body).to.have.property('description', 'This is a test function');
  });
});
