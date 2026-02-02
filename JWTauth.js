const jwt = require("jsonwebtoken");

const jwtAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token missing" });
    }
    try {
      const token = authHeader.split(" ")[1];
      const decoded_data = jwt.verify(token, process.env.random_secrete_key);
      req.user = decoded_data;
      next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired"
      });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(403).json({
        message: "Invalid token"
      });
    }
}};

module.exports = jwtAuth;
