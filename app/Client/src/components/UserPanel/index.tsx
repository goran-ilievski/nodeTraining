import React from "react";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { userAPI } from "../../api/handlers";
import LoadingSpinner from "../LoadingSpinner";
import SuccessPopup from "../SuccessPopup";
import ErrorPopup from "../ErrorPopup";
import "./styles.css";

interface User {
  id: number;
  username: string;
  role: string;
  created_at: string;
  updated_at: string;
}

interface UserPanelProps {
  onNavigate: (view: string) => void;
}

const UserPanel: React.FC<UserPanelProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [deletedUsername, setDeletedUsername] = React.useState("");

  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: userAPI.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: userAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setShowSuccess(true);
    },
    onError: (error: any) => {
      setErrorMessage(error.message);
      setShowError(true);
    },
  });

  if (user?.role !== "superuser") {
    return (
      <Container>
        <Paper className="user-panel-unauthorized">
          <Typography variant="h5">Access Denied</Typography>
          <Typography>You do not have permission to view this page.</Typography>
          <Button variant="contained" onClick={() => onNavigate("tutorials")}>
            Go Back
          </Button>
        </Paper>
      </Container>
    );
  }

  const handleUpdate = (userId: number) => {
    onNavigate(`user-details-${userId}`);
  };

  const handleDelete = (userId: number, username: string) => {
    setDeletedUsername(username);
    deleteMutation.mutate(userId);
  };

  return (
    <Container maxWidth="lg">
      <Box className="user-panel-container">
        <Paper elevation={3} className="user-panel-paper">
          <Typography variant="h4" className="user-panel-title">
            User Management Panel
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>{u.id}</TableCell>
                    <TableCell>{u.username}</TableCell>
                    <TableCell className="user-panel-role">{u.role}</TableCell>
                    <TableCell>
                      {new Date(u.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">
                      <Box className="user-panel-actions">
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleUpdate(u.id)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleDelete(u.id, u.username)}
                          disabled={deleteMutation.isPending}
                        >
                          Remove
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      <LoadingSpinner open={isLoading || deleteMutation.isPending} />

      <SuccessPopup
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        message={`User ${deletedUsername} deleted successfully!`}
      />

      <ErrorPopup
        open={showError}
        onClose={() => setShowError(false)}
        message={errorMessage}
      />
    </Container>
  );
};

export default UserPanel;
