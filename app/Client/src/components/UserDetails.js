import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { userAPI } from "../api/handlers";
import LoadingSpinner from "./LoadingSpinner";
import SuccessPopup from "./SuccessPopup";
import ErrorPopup from "./ErrorPopup";
import "./UserDetails.css";

const UserDetails = ({ onNavigate, userId }) => {
  const { user: currentUser } = useAuth();
  const targetUserId = userId || currentUser?.id;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", targetUserId],
    queryFn: () => userAPI.getById(targetUserId),
    enabled: !!targetUserId,
    onSuccess: (data) => {
      setUsername(data.username);
      setRole(data.role);
    },
  });

  React.useEffect(() => {
    if (userData) {
      setUsername(userData.username);
      setRole(userData.role);
    }
  }, [userData]);

  const mutation = useMutation({
    mutationFn: userAPI.update,
    onSuccess: () => {
      setShowSuccess(true);
    },
    onError: (error) => {
      setErrorMessage(error.message);
      setShowError(true);
    },
  });

  const validatePassword = (value) => {
    if (!value) return "";
    const minLength = 8;
    const hasCapital = /[A-Z]/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (value.length < minLength) {
      return "Password must be at least 8 characters long";
    }
    if (!hasCapital) {
      return "Password must contain at least 1 capital letter";
    }
    if (!hasSpecial) {
      return "Password must contain at least 1 special character";
    }
    return "";
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !role) {
      setErrorMessage("Username and role are required!");
      setShowError(true);
      return;
    }

    if (password) {
      const pwdError = validatePassword(password);
      if (pwdError) {
        setPasswordError(pwdError);
        return;
      }
    }

    const updateData = {
      username,
      role,
      password: password || userData.password,
    };

    mutation.mutate({ userId: targetUserId, userData: updateData });
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    if (currentUser.role === "superuser" && userId) {
      onNavigate("user-panel");
    }
  };

  const canEditRole =
    currentUser?.role === "superuser" &&
    userId &&
    targetUserId !== currentUser.id;

  if (
    currentUser?.role === "reviewer" &&
    userId &&
    targetUserId !== currentUser.id
  ) {
    return (
      <Container>
        <Paper className="user-details-unauthorized">
          <Typography variant="h5">Access Denied</Typography>
          <Typography>You can only edit your own user details.</Typography>
          <Button
            variant="contained"
            onClick={() => onNavigate("user-details")}
          >
            View Your Details
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box className="user-details-container">
        <Paper elevation={3} className="user-details-paper">
          <Typography variant="h4" className="user-details-title">
            User Details
          </Typography>

          <form onSubmit={handleSubmit} className="user-details-form">
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
              value={password}
              onChange={handlePasswordChange}
              disabled={mutation.isPending}
              error={!!passwordError}
              helperText={
                passwordError ||
                "Leave empty to keep current password. Min 8 characters, 1 capital letter, 1 special character"
              }
            />

            <FormControl fullWidth required>
              <InputLabel>Role</InputLabel>
              <Select
                value={role}
                label="Role"
                onChange={(e) => setRole(e.target.value)}
                disabled={mutation.isPending || !canEditRole}
              >
                <MenuItem value="superuser">Superuser</MenuItem>
                <MenuItem value="reviewer">Reviewer</MenuItem>
                <MenuItem value="guest">Guest</MenuItem>
              </Select>
            </FormControl>

            <Box className="user-details-buttons">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={mutation.isPending}
              >
                Update User
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                size="large"
                fullWidth
                onClick={() =>
                  currentUser.role === "superuser" && userId
                    ? onNavigate("user-panel")
                    : onNavigate("tutorials")
                }
                disabled={mutation.isPending}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>

      <LoadingSpinner open={isLoading || mutation.isPending} />

      <SuccessPopup
        open={showSuccess}
        onClose={handleSuccessClose}
        message="User updated successfully!"
      />

      <ErrorPopup
        open={showError}
        onClose={() => setShowError(false)}
        message={errorMessage}
      />
    </Container>
  );
};

export default UserDetails;
