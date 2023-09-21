const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'GEP SWU API Documentation',
      version: '1.2.0',
      description:
        `This is API documentation for GEP SWU Website. You can find all the API documentation here.`,
      
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
    },
    servers: [
      {
        url: 'https://gepswu-server.onrender.com',
        description: 'API server on Render',
      },
      {
        url: 'https://swu-gep-lerna.pages.dev/',
        description: 'Web Application on Cloudflare Pages',
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

