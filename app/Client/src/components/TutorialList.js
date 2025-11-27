import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import LogoutDialog from "./LogoutDialog";
import "./TutorialList.css";

const fetchTutorials = async () => {
  const response = await fetch("http://localhost:8080/api/tutorials");
  if (!response.ok) {
    throw new Error("Failed to fetch tutorials");
  }
  return response.json();
};

const TutorialList = ({ onNavigate }) => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { logout } = useAuth();

  const {
    data: tutorials = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tutorials"],
    queryFn: fetchTutorials,
    enabled: false, // Don't fetch automatically on mount
  });

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    onNavigate("login");
  };

  const handleLogoutCancel = () => {
    setShowLogoutDialog(false);
  };

  return (
    <Box className="tutorial-container">
      <Box className="tutorial-header">
        <Typography variant="h4" className="tutorial-title">
          Tutorials
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={handleLogoutClick}
          className="tutorial-logout-button"
        >
          Logout
        </Button>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={() => refetch()}
        className="tutorial-button"
      >
        Get All Tutorials
      </Button>

      {isLoading && <CircularProgress />}

      {error && <Typography color="error">Error: {error.message}</Typography>}

      {tutorials.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Published</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tutorials.map((tutorial) => (
                <TableRow key={tutorial.id}>
                  <TableCell>{tutorial.id}</TableCell>
                  <TableCell>{tutorial.title}</TableCell>
                  <TableCell>{tutorial.description}</TableCell>
                  <TableCell>{tutorial.published ? "Yes" : "No"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {!isLoading && tutorials.length === 0 && !error && (
        <Typography className="tutorial-empty-message">
          No tutorials found. Click the button to fetch tutorials.
        </Typography>
      )}

      <LogoutDialog
        open={showLogoutDialog}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </Box>
  );
};

export default TutorialList;
