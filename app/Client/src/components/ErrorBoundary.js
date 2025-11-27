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
import "./ErrorBoundary.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  handleClose = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <Dialog open={true} maxWidth="sm" fullWidth>
          <DialogContent className="error-boundary-content">
            <Box className="error-boundary-icon-container">
              <span className="error-boundary-icon">⚠️</span>
            </Box>
            <DialogTitle className="error-boundary-title">
              Oops! Something went wrong
            </DialogTitle>
            <Typography className="error-boundary-message">
              We're sorry, but something unexpected happened. Please try again
              later or contact support if the problem persists.
            </Typography>
          </DialogContent>
          <DialogActions className="error-boundary-actions">
            <Button
              onClick={this.handleClose}
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Go to Home
            </Button>
          </DialogActions>
        </Dialog>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
