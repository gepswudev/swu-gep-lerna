var express = require('express');
var router = express.Router();
var platform = require('platform');
var axios = require('axios');
const { log } = require('../logger');
const deployed = process.env.DEPLOYED || 'false';

//middleware
const identifyIP = require('../middlewares/ipidentify');

router.get('/', identifyIP, async function(req, res, next) {
  res.locals.userAgent = req.get('User-Agent');
  res.render('index', { title: 'GEP-SWU Server' });
});

module.exports = router;


/**
 * @swagger
 * /:
 *   get:
 *     summary: Main page of API server and API documentation
 *     description: This is the main page of API server for GEP SWU Website. You can find all the API documentation here.
 * 
 * /docs:
 *   get:
 *    summary: API documentation
 *    description: This is the API documentation page of API server for GEP SWU Website. You can find all the API documentation here.
*/