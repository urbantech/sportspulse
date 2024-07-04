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

describe('Function Update Tests', () => {
  let functionId;

  beforeAll(async () => {
    console.log('BeforeAll Hook: Started');
    try {
      console.log('Step 1: Attempting to connect to test database...');
      await connectDB();
      console.log('Step 2: MongoDB connected...');
      
      const res = await request(app)
        .post('/api/functions')
        .send({
          name: 'Initial Function',
          description: 'This is an initial function',
        });
      functionId = res.body._id;
      console.log('Step 3: Created initial function:', res.body);
    } catch (err) {
      console.error('Error during beforeAll setup:', err);
      throw err;
    }
    console.log('BeforeAll Hook: Completed');
  }, 180000); // 180 seconds timeout for setup

  afterAll(async () => {
    console.log('AfterAll Hook: Started');
    try {
      console.log('Step 9: Attempting to drop test database...');
      await mongoose.connection.db.dropDatabase();
      console.log('Step 10: Test database dropped successfully.');
      await mongoose.connection.close();
      console.log('Step 11: Database connection closed.');
    } catch (err) {
      console.error('Error during afterAll cleanup:', err);
    }
    console.log('AfterAll Hook: Completed');
  });

  it('should update an existing function', async () => {
    try {
      const updateData = {
        name: 'Updated Function',
        description: 'This is an updated function',
      };

      console.log('Step 13: Attempting to update function with ID:', functionId);
      const res = await request(app)
        .put(`/api/functions/${functionId}`)
        .send(updateData)
        .expect(200);

      console.log('Step 14: Update response:', res.body);
      expect(res.body).to.have.property('name', 'Updated Function');
      expect(res.body).to.have.property('description', 'This is an updated function');
    } catch (err) {
      console.error('Error during function update test:', err);
      throw err;
    }
  }, 180000); // 180 seconds timeout for this test
});
