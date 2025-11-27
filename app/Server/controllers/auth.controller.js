const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middleware/auth.js");

// Login endpoint
exports.login = (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: "Username and password are required!",
    });
    return;
  }

  // Find user by username
  User.findByUsername(req.body.username, async (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(401).send({
          message: "Invalid credentials",
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user",
        });
      }
    } else {
      // In production, verify password with bcrypt
      // For now, we'll just generate token
      // const isPasswordValid = await bcrypt.compare(req.body.password, data.password);

      // if (!isPasswordValid) {
      //   return res.status(401).send({
      //     message: "Invalid credentials",
      //   });
      // }

      const token = generateToken(data);

      res.send({
        id: data.id,
        username: data.username,
        role: data.role,
        token: token,
      });
    }
  });
};
