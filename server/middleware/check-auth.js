const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const JWT_KEY = process.env.JWT_KEY;

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error("Authentication failed!");
    }
    if (!JWT_KEY) {
      throw new Error("Missing JWT_KEY.");
    }
    const decodedToken = jwt.verify(token, JWT_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed!", 401);
    next(error);
  }
};
