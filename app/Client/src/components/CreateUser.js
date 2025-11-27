import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import SuccessPopup from "./SuccessPopup";
import ErrorPopup from "./ErrorPopup";
import "./CreateUser.css";

const createUser = async (userData) => {
  const response = await fetch("http://localhost:8080/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create user");
  }

  return response.json();
};

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [permissions, setPermissions] = useState({
    superuser: false,
    reviewer: false,
    guest: false,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      setShowSuccess(true);
    },
    onError: (error) => {
      setErrorMessage(error.message);
      setShowError(true);
    },
  });

  const handlePermissionChange = (event) => {
    setPermissions({
      ...permissions,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedPermissions = Object.keys(permissions).filter(
      (key) => permissions[key]
    );

    mutation.mutate({
      username,
      password,
      permissions: selectedPermissions,
    });
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate("/");
  };

  const handleErrorClose = () => {
    setShowError(false);
  };

  return (
    <Container maxWidth="sm">
      <Box className="create-user-container">
        <Paper elevation={3} className="create-user-paper">
          <Typography variant="h4" component="h1" className="create-user-title">
            Create New User
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="create-user-subtitle"
          >
            Fill in the details to create a new user account
          </Typography>

          <form onSubmit={handleSubmit} className="create-user-form">
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={mutation.isPending}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={mutation.isPending}
            />

            <Box className="create-user-permissions">
              <Typography
                variant="subtitle1"
                className="create-user-permissions-title"
              >
                Permissions
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={permissions.superuser}
                      onChange={handlePermissionChange}
                      name="superuser"
                      disabled={mutation.isPending}
                    />
                  }
                  label="Superuser"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={permissions.reviewer}
                      onChange={handlePermissionChange}
                      name="reviewer"
                      disabled={mutation.isPending}
                    />
                  }
                  label="Reviewer"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={permissions.guest}
                      onChange={handlePermissionChange}
                      name="guest"
                      disabled={mutation.isPending}
                    />
                  }
                  label="Guest"
                />
              </FormGroup>
            </Box>

            <Box className="create-user-buttons">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Create User"
                )}
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                size="large"
                fullWidth
                onClick={handleCancel}
                disabled={mutation.isPending}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>

      <SuccessPopup
        open={showSuccess}
        onClose={handleSuccessClose}
        message={`User ${username} created successfully!`}
      />

      <ErrorPopup
        open={showError}
        onClose={handleErrorClose}
        message={errorMessage}
      />
    </Container>
  );
};

export default CreateUser;
