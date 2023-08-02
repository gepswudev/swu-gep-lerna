var express = require('express');
var router = express.Router();
var platform = require('platform');
var axios = require('axios');
const { log } = require('../logger');


/**
 * @swagger
 * /:
 *   get:
 *     summary: Main page of API server and API documentation
 *     description: This is the main page of API server for GEP SWU Website. You can find all the API documentation here.
*/
router.get('/', async function(req, res, next) {
  const ua = platform.parse(req.get('User-Agent'));
  res.locals.ip = req.ip;
  //not fetch ipinfo if localhost
  log("Server", `Connection from ${req.ip}`, 'log', true);
  if (req.ip.startsWith('::1') || req.ip.startsWith('::ffff:')){
    res.locals.hostname = 'localhost';
    res.locals.city = 'localhost';
    res.locals.region = 'localhost';
    res.locals.country = 'localhost';
    res.locals.loc = 'localhost';
    res.locals.org = 'localhost';
    res.locals.postal = 'localhost';
    res.locals.timezone = 'localhost';
    res.locals.readme = 'localhost';
  }else{
    const ipInfo = await axios.get(`https://ipinfo.io/${req.ip}?token=4c71014842cc6a`).then(res => res.data).catch(err => `Unknown`);
    log("Server", ipInfo);
    res.locals.hostname = ipInfo.hostname;
    res.locals.city = ipInfo.city;
    res.locals.region = ipInfo.region;
    res.locals.country = ipInfo.country;
    res.locals.loc = ipInfo.loc;
    res.locals.org = ipInfo.org;
    res.locals.postal = ipInfo.postal;
    res.locals.timezone = ipInfo.timezone;
  }

  res.locals.userAgent = req.get('User-Agent');
  res.locals.ua = ua;
  res.render('index', { title: 'GEP-SWU Server' });
});

module.exports = router;
