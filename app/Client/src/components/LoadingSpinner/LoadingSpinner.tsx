import React from "react";
import { Dialog, CircularProgress, Box } from "@mui/material";
import "./LoadingSpinner.styled.css";

interface LoadingSpinnerProps {
  open: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ open }) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="loading-dialog"
      PaperProps={{
        className: "loading-spinner-dialog",
      }}
    >
      <Box className="loading-spinner-content">
        <CircularProgress size={60} />
      </Box>
    </Dialog>
  );
};

export default LoadingSpinner;
