const mongoose = require('mongoose');
const { expect } = require('chai');
const FunctionModel = require('../models/functionModel');

describe('Function Model Tests', () => {
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
      const functionModel = await FunctionModel.create(functionData);
      console.log('Created Function:', functionModel);
      expect(functionModel).to.have.property('name', 'Test Function');
      expect(functionModel).to.have.property('description', 'This is a test function');
    } catch (error) {
      console.error('Error creating function:', error);
      throw error;
    }
  });
});
