const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const FunctionModel = require('../models/functionModel');
const connectDB = require('../config/db');

describe('Function Update Tests', () => {
    let functionId;

    beforeAll(async (done) => {
        console.log('BeforeAll Hook: Started');
        try {
            console.log('Step 1: Attempting to connect to test database...');
            await connectDB();
            console.log('Step 2: MongoDB connected...');

            const testFunction = new FunctionModel({ name: 'Test Function', description: 'This is a test function' });
            await testFunction.save();
            functionId = testFunction._id;

            console.log('BeforeAll Hook: Completed');
            done();
        } catch (error) {
            console.error('Error in beforeAll:', error);
            done(error);
        }
    });

    afterAll(async (done) => {
        console.log('AfterAll Hook: Started');
        try {
            console.log('Step 9: Attempting to drop test database...');
            await mongoose.connection.db.dropDatabase();
            console.log('Step 10: Test database dropped successfully.');
            await mongoose.connection.close();
            console.log('Step 11: Database connection closed.');
            console.log('AfterAll Hook: Completed');
            done();
        } catch (error) {
            console.error('Error in afterAll:', error);
            done(error);
        }
    });

    test('should update an existing function', async () => {
        const updateData = { name: 'Updated Function', description: 'This is an updated test function' };
        const response = await request(app)
            .put(`/api/functions/${functionId}`)
            .send(updateData)
            .expect(200);

        expect(response.body).toHaveProperty('name', 'Updated Function');
        expect(response.body).toHaveProperty('description', 'This is an updated test function');
    });
});
