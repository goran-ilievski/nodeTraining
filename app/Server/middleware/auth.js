const jwt = require("jsonwebtoken");

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRATION = "15m";

// Generate JWT token
exports.generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

// Verify JWT token middleware
exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized! Token is invalid or expired.",
      });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

// Verify role middleware
exports.isRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.userRole) {
      return res.status(403).send({
        message: "No role found!",
      });
    }

    if (!allowedRoles.includes(req.userRole)) {
      return res.status(403).send({
        message: "Access denied! Insufficient permissions.",
      });
    }

    next();
  };
};
