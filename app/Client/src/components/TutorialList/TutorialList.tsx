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
import "./TutorialList.styled.css";

interface Tutorial {
  id: number;
  title: string;
  description: string;
  published: boolean;
}

interface TutorialListProps {
  onNavigate: (view: string) => void;
}

const fetchTutorials = async (): Promise<Tutorial[]> => {
  const response = await fetch("http://localhost:8080/api/tutorials");
  if (!response.ok) {
    throw new Error("Failed to fetch tutorials");
  }
  return response.json();
};

const TutorialList: React.FC<TutorialListProps> = () => {
  const {
    data: tutorials = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tutorials"],
    queryFn: fetchTutorials,
    enabled: true,
  });

  return (
    <Box className="tutorial-container">
      <Box className="tutorial-header">
        <Typography variant="h4" className="tutorial-title">
          Tutorials
        </Typography>
      </Box>

      {isLoading && <CircularProgress />}

      {error && (
        <Typography color="error">Error: {(error as Error).message}</Typography>
      )}

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
          No tutorials available.
        </Typography>
      )}
    </Box>
  );
};

export default TutorialList;
