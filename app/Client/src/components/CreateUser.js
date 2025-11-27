import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import SuccessPopup from "./SuccessPopup";
import ErrorPopup from "./ErrorPopup";
import "./CreateUser.css";

const createUser = async (userData) => {
  const delay = new Promise((resolve) => setTimeout(resolve, 2000));
  const apiCall = fetch("http://localhost:8080/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const [response] = await Promise.all([apiCall, delay]);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create user");
  }

  return response.json();
};

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({
      username,
      password,
      role,
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

            <FormControl fullWidth required>
              <InputLabel>Role</InputLabel>
              <Select
                value={role}
                label="Role"
                onChange={(e) => setRole(e.target.value)}
                disabled={mutation.isPending}
              >
                <MenuItem value="superuser">Superuser</MenuItem>
                <MenuItem value="reviewer">Reviewer</MenuItem>
                <MenuItem value="guest">Guest</MenuItem>
              </Select>
            </FormControl>

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
