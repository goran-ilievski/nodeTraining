import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { userAPI } from "../api/handlers";
import LoadingSpinner from "./LoadingSpinner";
import ErrorPopup from "./ErrorPopup";
import "./LandingPage.css";

const LandingPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginMutation = useMutation({
    mutationFn: userAPI.login,
    onSuccess: (data) => {
      login(data);
      navigate("/tutorials");
    },
    onError: (error) => {
      setErrorMessage(error.message || "Login failed");
      setShowError(true);
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("Username and password are required!");
      setShowError(true);
      return;
    }

    loginMutation.mutate(username);
  };

  const handleCreateUser = () => {
    navigate("/create-user");
  };

  return (
    <Container maxWidth="sm">
      <Box className="landing-container">
        <Paper elevation={3} className="landing-paper">
          <Typography variant="h4" component="h1" className="landing-title">
            Tutorial Manager
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="landing-subtitle"
          >
            Please log in to continue
          </Typography>

          <form onSubmit={handleLogin} className="landing-form">
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Log In
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              size="large"
              fullWidth
              onClick={handleCreateUser}
            >
              Create User
            </Button>
          </form>
        </Paper>
      </Box>

      <LoadingSpinner open={loginMutation.isPending} />

      <ErrorPopup
        open={showError}
        onClose={() => setShowError(false)}
        message={errorMessage}
      />
    </Container>
  );
};

export default LandingPage;
