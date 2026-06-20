const jwt = require("jsonwebtoken");

const SECRET_KEY = "mysecretkey";

// Verify Token Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.send("Access Denied");
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY);

    req.user = verified;

    next();
  } catch (err) {
    res.send("Invalid Token");
  }
};

// Admin Middleware
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.send("Admin Access Only");
  }

  next();
};

module.exports = { verifyToken, isAdmin };