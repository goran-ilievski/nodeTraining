const sql = require("./index.js");

// Constructor
const Tutorial = function (tutorial) {
  this.title = tutorial.title;
  this.description = tutorial.description;
  this.published = tutorial.published;
};

Tutorial.create = (newTutorial, result) => {
  sql.query(
    "INSERT INTO tutorials(title, description, published) VALUES($1, $2, $3) RETURNING *",
    [newTutorial.title, newTutorial.description, newTutorial.published],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created tutorial: ", res.rows[0]);
      result(null, res.rows[0]);
    }
  );
};

Tutorial.findById = (id, result) => {
  sql.query("SELECT * FROM tutorials WHERE id = $1", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.rows.length) {
      console.log("found tutorial: ", res.rows[0]);
      result(null, res.rows[0]);
      return;
    }

    // Not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Tutorial.getAll = (title, result) => {
  let query = "SELECT * FROM tutorials";
  let params = [];

  if (title) {
    query += " WHERE title ILIKE $1";
    params.push(`%${title}%`);
  }

  sql.query(query, params, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res.rows);
    result(null, res.rows);
  });
};

Tutorial.getAllPublished = (result) => {
  sql.query("SELECT * FROM tutorials WHERE published = true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res.rows);
    result(null, res.rows);
  });
};

Tutorial.updateById = (id, tutorial, result) => {
  sql.query(
    "UPDATE tutorials SET title = $1, description = $2, published = $3 WHERE id = $4",
    [tutorial.title, tutorial.description, tutorial.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.rowCount == 0) {
        // Not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
    }
  );
};

Tutorial.remove = (id, result) => {
  sql.query("DELETE FROM tutorials WHERE id = $1", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.rowCount == 0) {
      // Not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};

Tutorial.removeAll = (result) => {
  sql.query("DELETE FROM tutorials", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.rowCount} tutorials`);
    result(null, res);
  });
};

module.exports = Tutorial;
