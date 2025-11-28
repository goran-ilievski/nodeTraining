import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import "./styles.css";

interface ErrorPopupProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ open, onClose, message }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent className="error-popup-content">
        <Box className="error-popup-icon-container">
          <span className="error-popup-icon">❌</span>
        </Box>
        <DialogTitle className="error-popup-title">Error</DialogTitle>
        <Typography className="error-popup-message">
          {message || "Something went wrong. Please try again later."}
        </Typography>
      </DialogContent>
      <DialogActions className="error-popup-actions">
        <Button
          onClick={onClose}
          variant="contained"
          color="error"
          fullWidth
          size="large"
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorPopup;
