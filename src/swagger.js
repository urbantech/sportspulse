const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sportspulse API',
      version: '1.0.0',
      description: 'API documentation for Sportspulse',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // files containing annotations
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
