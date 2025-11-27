import React from "react";
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

const fetchTutorials = async () => {
  const response = await fetch("http://localhost:8080/api/tutorials");
  if (!response.ok) {
    throw new Error("Failed to fetch tutorials");
  }
  return response.json();
};

const TutorialList = () => {
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

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Tutorials
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => refetch()}
        sx={{ mb: 2 }}
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
        <Typography>
          No tutorials found. Click the button to fetch tutorials.
        </Typography>
      )}
    </Box>
  );
};

export default TutorialList;
