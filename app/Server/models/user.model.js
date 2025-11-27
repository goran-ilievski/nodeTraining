const sql = require("./index.js");

// Constructor
const User = function (user) {
  this.username = user.username;
  this.password = user.password;
  this.role = user.role;
};

User.create = (newUser, result) => {
  sql.query(
    "INSERT INTO users(username, password, role) VALUES($1, $2, $3) RETURNING id, username, role, created_at",
    [newUser.username, newUser.password, newUser.role],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created user: ", res.rows[0]);
      result(null, res.rows[0]);
    }
  );
};

User.findById = (id, result) => {
  sql.query(
    "SELECT id, username, role, created_at, updated_at FROM users WHERE id = $1",
    [id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.rows.length) {
        console.log("found user: ", res.rows[0]);
        result(null, res.rows[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

User.findByUsername = (username, result) => {
  sql.query(
    "SELECT id, username, role, created_at, updated_at FROM users WHERE username = $1",
    [username],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.rows.length) {
        result(null, res.rows[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

User.getAll = (result) => {
  sql.query(
    "SELECT id, username, role, created_at, updated_at FROM users",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      result(null, res.rows);
    }
  );
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET username = $1, password = $2, role = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING id, username, role, updated_at",
    [user.username, user.password, user.role, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.rowCount == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", res.rows[0]);
      result(null, res.rows[0]);
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = $1", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.rowCount == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

module.exports = User;
