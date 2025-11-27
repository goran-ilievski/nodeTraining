module.exports = (app) => {
  const auth = require("../controllers/auth.controller.js");

  // Login endpoint
  app.post("/api/auth/login", auth.login);
};
