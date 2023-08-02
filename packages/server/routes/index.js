var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Main page of API server and API documentation
 *     description: This is the main page of API server for GEP SWU Website. You can find all the API documentation here.
*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GEP-SWU Server' });
});

module.exports = router;
