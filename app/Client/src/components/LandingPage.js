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
import "./LandingPage.css";

const LandingPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // For now, just navigate to tutorials (authentication will be added later)
    if (username && password) {
      navigate("/tutorials");
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
