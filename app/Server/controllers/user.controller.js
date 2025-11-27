const User = require("../models/user.model.js");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: "Username and password are required!",
    });
    return;
  }

  // Create a User
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    permissions: req.body.permissions || [],
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err) {
      if (err.code === "23505") {
        // Unique constraint violation
        res.status(409).send({
          message: "Username already exists!",
        });
      } else {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User.",
        });
      }
    } else {
      res.status(201).send(data);
    }
  });
};

// Retrieve all Users from the database
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    } else {
      res.send(data);
    }
  });
};

// Find a single User by Id
exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User not found with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving User with id ${req.params.id}`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Update a User identified by the id
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  User.updateById(req.params.id, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User not found with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error updating User with id ${req.params.id}`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Delete a User with the specified id
exports.delete = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User not found with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete User with id ${req.params.id}`,
        });
      }
    } else {
      res.send({ message: `User was deleted successfully!` });
    }
  });
};
