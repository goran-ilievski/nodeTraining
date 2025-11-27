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
import axios from "axios";

const TutorialList = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTutorials = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8080/api/tutorials");
      setTutorials(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Tutorials
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={fetchTutorials}
        sx={{ mb: 2 }}
      >
        Get All Tutorials
      </Button>

      {loading && <CircularProgress />}

      {error && <Typography color="error">Error: {error}</Typography>}

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

      {!loading && tutorials.length === 0 && !error && (
        <Typography>
          No tutorials found. Click the button to fetch tutorials.
        </Typography>
      )}
    </Box>
  );
};

export default TutorialList;
