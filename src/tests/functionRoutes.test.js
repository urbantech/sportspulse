const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const functionRoutes = require('../routes/functionRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/api/functions', functionRoutes);

describe('Function Routes Tests', () => {
  beforeAll((done) => {
    mongoose.connect('mongodb://localhost:27017/sportspulse_test', { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('We are connected to test database!');
      done();
    });
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

    console.log('Function Data:', functionData);

    try {
      const res = await request(app)
        .post('/api/functions')
        .send(functionData)
        .expect(200);

      console.log('Response:', res.body);
      expect(res.body).to.have.property('name', 'Test Function');
      expect(res.body).to.have.property('description', 'This is a test function');
    } catch (error) {
      console.error('Error creating function via route:', error);
      throw error;
    }
  });
});
