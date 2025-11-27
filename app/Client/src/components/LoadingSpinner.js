import React from "react";
import { Dialog, CircularProgress, Box } from "@mui/material";
import "./LoadingSpinner.css";

const LoadingSpinner = ({ open }) => {
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
