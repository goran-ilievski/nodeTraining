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
import { withTranslation, WithTranslation } from "react-i18next";
import "./ErrorBoundary.styled.css";

interface ErrorBoundaryProps extends WithTranslation {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(_error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  handleClose = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      const t = this.props.t || ((key: string) => key);

      return (
        <Dialog open={true} maxWidth="sm" fullWidth>
          <DialogContent className="error-boundary-content">
            <Box className="error-boundary-icon-container">
              <span className="error-boundary-icon">⚠️</span>
            </Box>
            <DialogTitle className="error-boundary-title">
              {t("errorBoundary.title")}
            </DialogTitle>
            <Typography className="error-boundary-message">
              {t("errorBoundary.message")}
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
              {t("errorBoundary.goHome")}
            </Button>
          </DialogActions>
        </Dialog>
      );
    }

    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);
