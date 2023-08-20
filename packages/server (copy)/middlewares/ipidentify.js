const platform = require("platform");
const axios = require("axios");
const { log } = require("../logger");
const deployed = process.env.DEPLOYED || "false";

async function identifyIP(req, res, next) {
  try {
    const ua = platform.parse(req.get("User-Agent"));
    const ip =
      req.headers["cf-connecting-ip"] ||
      req.headers["true-client-ip"] ||
      "localhost";
    //not fetch ipinfo if localhost
    if (
      ip === "::1" ||
      ip === "::ffff:" ||
      ip.startsWith("::") ||
      ip.startsWith("localhost")
    ) {
      res.locals.hostname = "localhost";
      res.locals.city = "localhost";
      res.locals.region = "localhost";
      res.locals.country = "localhost";
      res.locals.loc = "localhost";
      res.locals.org = "localhost";
      res.locals.postal = "localhost";
      res.locals.timezone = "localhost";
      res.locals.ua = ua;
      log("Server", `Connection from localhost`, "log", true);
      next();
    } else {
      const ipInfo = await axios
        .get(`https://ipinfo.io/${ip}?token=${process.env.IPINFO_TOKEN}`)
        .then((res) => res.data)
        .catch((err) => `Unknown`);
      res.locals.ip = ipInfo.ip;
      res.locals.hostname = ipInfo.hostname;
      res.locals.city = ipInfo.city;
      res.locals.region = ipInfo.region;
      res.locals.country = ipInfo.country;
      res.locals.loc = ipInfo.loc;
      res.locals.org = ipInfo.org;
      res.locals.postal = ipInfo.postal;
      res.locals.timezone = ipInfo.timezone;
      res.locals.ua = ua;
      log(
        "Server",
        `Connection from ${ip} at ${ipInfo.city}, ${ipInfo.country}`,
        "log",
        true
      );
      next();
    }
  } catch (error) {
    log("Server", `IP Indentify Error: ${error}`, "error", true);
  }
}

module.exports = identifyIP;
