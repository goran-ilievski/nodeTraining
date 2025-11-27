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
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";
import ErrorPopup from "./ErrorPopup";
import "./LandingPage.css";

const LandingPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setErrorMessage("Username and password are required!");
      setShowError(true);
      return;
    }

    setIsLoading(true);

    try {
      // Fetch user by username
      const response = await fetch(
        `http://localhost:8080/api/users?username=${username}`
      );

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const users = await response.json();
      const user = users.find((u) => u.username === username);

      if (!user) {
        throw new Error("Invalid credentials");
      }

      // In production, you would verify the password hash here
      // For now, we'll just log them in
      login({ id: user.id, username: user.username, role: user.role });
      navigate("/tutorials");
    } catch (error) {
      setErrorMessage(error.message || "Login failed");
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
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
    </Container>
  );
};

export default LandingPage;
