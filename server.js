const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for all origins during development
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

require("./app/Server/routes/tutorial.routes.js")(app);
require("./app/Server/routes/user.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
