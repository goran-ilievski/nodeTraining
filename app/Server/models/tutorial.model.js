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

Tutorial.getAll = (title, page, limit, result) => {
  let query = "SELECT * FROM tutorials";
  let countQuery = "SELECT COUNT(*) FROM tutorials";
  let params = [];
  let paramIndex = 1;

  if (title) {
    query += " WHERE title ILIKE $" + paramIndex;
    countQuery += " WHERE title ILIKE $1";
    params.push(`%${title}%`);
    paramIndex++;
  }

  // Add sorting by title descending
  query += " ORDER BY title DESC";

  // Add pagination if page and limit are provided
  if (page !== undefined && limit !== undefined) {
    const offset = (page - 1) * limit;
    query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);
  }

  // Get total count
  sql.query(countQuery, title ? [params[0]] : [], (err, countRes) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    const totalItems = parseInt(countRes.rows[0].count);

    // Get paginated data
    sql.query(query, params, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      result(null, {
        tutorials: res.rows,
        totalItems: totalItems,
        currentPage: page || 1,
        totalPages: limit ? Math.ceil(totalItems / limit) : 1,
      });
    });
  });
};

Tutorial.getAllPublished = (result) => {
  sql.query("SELECT * FROM tutorials WHERE published = true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

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

    result(null, res);
  });
};

module.exports = Tutorial;
