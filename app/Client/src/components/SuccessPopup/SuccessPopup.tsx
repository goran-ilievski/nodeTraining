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
import "./SuccessPopup.styled.css";

interface SuccessPopupProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({
  open,
  onClose,
  message,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent className="success-popup-content">
        <Box className="success-popup-icon-container">
          <span className="success-popup-icon">✅</span>
        </Box>
        <DialogTitle className="success-popup-title">Success!</DialogTitle>
        <Typography className="success-popup-message">
          {message || "Operation completed successfully"}
        </Typography>
      </DialogContent>
      <DialogActions className="success-popup-actions">
        <Button
          onClick={onClose}
          variant="contained"
          color="success"
          fullWidth
          size="large"
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessPopup;
