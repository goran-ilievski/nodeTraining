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
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { userAPI } from "../../api";
import SuccessPopup from "../SuccessPopup";
import ErrorPopup from "../ErrorPopup";
import LoadingSpinner from "../LoadingSpinner";
import PublicHeader from "../PublicHeader";
import "./CreateUser.styled.css";

interface CreateUserProps {
  onNavigate: (view: string) => void;
}

const CreateUser: React.FC<CreateUserProps> = ({ onNavigate }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation({
    mutationFn: userAPI.create,
    onSuccess: () => {
      setShowSuccess(true);
    },
    onError: (error: any) => {
      setErrorMessage(error.message);
      setShowError(true);
    },
  });

  const validatePassword = (value: string): string => {
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password || !role) {
      setErrorMessage("All fields are required!");
      setShowError(true);
      return;
    }

    const pwdError = validatePassword(password);
    if (pwdError) {
      setPasswordError(pwdError);
      return;
    }

    mutation.mutate({
      username,
      password,
      role,
    });
  };

  const handleCancel = () => {
    onNavigate("login");
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onNavigate("login");
  };

  const handleErrorClose = () => {
    setShowError(false);
  };

  return (
    <>
      <PublicHeader />
      <Container maxWidth="sm">
        <Box className="create-user-container">
          <Paper elevation={3} className="create-user-paper">
            <Typography
              variant="h4"
              component="h1"
              className="create-user-title"
            >
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
                onChange={handlePasswordChange}
                disabled={mutation.isPending}
                error={!!passwordError}
                helperText={
                  passwordError ||
                  "Min 8 characters, 1 capital letter, 1 special character"
                }
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
                  Create User
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

        <LoadingSpinner open={mutation.isPending} />

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
    </>
  );
};

export default CreateUser;
