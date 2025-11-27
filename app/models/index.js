const dbConfig = require("../config/db.config.js");

const { Pool } = require("pg");

const pool = new Pool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT,
});

pool.query("SELECT NOW()", (error, results) => {
  if (error) {
    console.error("Error connecting to the database:", error.message);
    console.error(
      "Please make sure PostgreSQL is running and the credentials in app/config/db.config.js are correct."
    );
    return;
  }
  console.log("Successfully connected to the database.");
});

module.exports = pool;
