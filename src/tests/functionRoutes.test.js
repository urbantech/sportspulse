const request = require('supertest');
const app = require('../app');
const FunctionModel = require('../models/functionModel');
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const { expect } = require('chai');

describe('Function Routes Tests', () => {
    let server;

    beforeAll(async () => {
        await connectDB();
        server = app.listen(4000, () => {
            global.agent = request.agent(server);
        });
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
        server.close();
    });

    test('should create a new function', async () => {
        const response = await request(app).post('/api/functions').send({
            name: 'Test Function',
            description: 'This is a test function',
        }).expect(201);

        expect(response.body.name).to.equal('Test Function');
        expect(response.body.description).to.equal('This is a test function');
    });
});
