const chai = require('chai');
global.expect = chai.expect;

module.exports = {
  testEnvironment: 'node',
  verbose: true,
  setupFilesAfterEnv: ['./jest.setup.js'],
  testMatch: ['**/src/tests/**/*.test.js'],
};
