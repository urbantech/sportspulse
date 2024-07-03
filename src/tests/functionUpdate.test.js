const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const functionRoutes = require('../routes/functionRoutes');
const connectDB = require('../config/db');

const app = express();
app.use(bodyParser.json());
app.use('/api/functions', functionRoutes);

describe('Function Update Tests', () => {
  let functionId;

  beforeAll(async (done) => {
    await connectDB();
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', async () => {
      console.log('We are connected to test database!');
      const res = await request(app)
        .post('/api/functions')
        .send({
          name: 'Initial Function',
          description: 'This is an initial function',
        });
      functionId = res.body._id;
      done();
    });
  });

  afterAll((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });

  it('should update an existing function', async () => {
    const updateData = {
      name: 'Updated Function',
      description: 'This is an updated function',
    };

    const res = await request(app)
      .put(`/api/functions/${functionId}`)
      .send(updateData)
      .expect(200);

    expect(res.body).to.have.property('name', 'Updated Function');
    expect(res.body).to.have.property('description', 'This is an updated function');
  });
});
