const jwt = require("jsonwebtoken");
const { log } = require("../logger.js");

const secret = process.env.JWT_SECRET;
const tokenExp = process.env.JWT_EXPIRATION;

const tokenize = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1] || req.body.token || req.query.token;
    const decoded = jwt.verify(token, secret);
    //if token expired
    const exp = new Date(decoded.exp * 1000);
    decoded.expDate = exp;
    log("Token", `Token expires at ${exp}`, "info");
    if (exp < new Date()) {
        log("Token", `Auth: ${res.locals.ip ?? 'loaclhost'} | Token expired!`, "error");
        return res.status(401).json({
            status: "error",
            message: "Token expired!",
        });
    }
    if(!decoded){
        log("Token", `Auth: ${res.locals.ip ?? 'loaclhost'} | Invalid token!`, "error");
        return res.status(401).json({
            status: "error",
            message: "Invalid token!",
        });
    }
    req.userData = decoded;
    next();
  } catch (err) {
    log("Token", `Auth: ${res.locals.ip ?? 'loaclhost'} | Invalid token!`, "error");
    return res.status(401).json({
      status: "error",
      message: "Invalid token!",
    });
  }
};

const generateToken = (payload) => {
    return jwt.sign(payload, secret, { expiresIn: tokenExp });
}

module.exports = { tokenize, generateToken };