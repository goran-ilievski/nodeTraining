import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import "./LogoutDialog.styled.css";

interface LogoutDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutDialog: React.FC<LogoutDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle className="logout-dialog-title">Confirm Logout</DialogTitle>
      <DialogContent className="logout-dialog-content">
        <Typography>Are you sure you want to logout?</Typography>
      </DialogContent>
      <DialogActions className="logout-dialog-actions">
        <Button onClick={onClose} variant="outlined" color="secondary">
          No
        </Button>
        <Button onClick={onConfirm} variant="contained" color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog;
