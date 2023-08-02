const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'GEP SWU API Documentation',
      version: '1.1.0',
      description:
        `This is API documentation for GEP SWU Website. You can find all the API documentation here.`,
      
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Passion Fruit team',
        url: 'mailto:work@iamickdev.com',
      },
    },
    servers: [
      {
        url: 'https://gepswu-server.onrender.com',
        description: 'API server on Render',
      },
    ],
  };

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec }

