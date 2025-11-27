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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./CreateUser.css";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [permissions, setPermissions] = useState({
    superuser: false,
    reviewer: false,
    guest: false,
  });
  const navigate = useNavigate();

  const handlePermissionChange = (event) => {
    setPermissions({
      ...permissions,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just show the data and navigate back
    const selectedPermissions = Object.keys(permissions).filter(
      (key) => permissions[key]
    );
    console.log({
      username,
      password,
      permissions: selectedPermissions,
    });
    alert(
      `User ${username} created with permissions: ${selectedPermissions.join(
        ", "
      )}`
    );
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
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
              >
                Create User
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                size="large"
                fullWidth
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateUser;
