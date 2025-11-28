import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import LogoutDialog from "../LogoutDialog";
import "./Header.styled.css";

interface HeaderProps {
  onNavigate: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleUserPanel = () => {
    onNavigate("user-panel");
  };

  const handleUserDetails = () => {
    onNavigate("user-details");
  };

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    onNavigate("login");
  };

  const handleLogoutCancel = () => {
    setShowLogoutDialog(false);
  };

  if (!user) return null;

  return (
    <AppBar position="static" className="header">
      <Toolbar className="header-toolbar">
        <Typography variant="h6" className="header-title">
          Tutorial App
        </Typography>

        <Box className="header-user-section">
          <Box className="header-user-info">
            <Typography variant="body1" className="header-username">
              {user.username}
            </Typography>
            <Typography variant="body2" className="header-role">
              {user.role}
            </Typography>
          </Box>

          {user.role !== "guest" && user.role === "superuser" && (
            <Button
              color="inherit"
              onClick={handleUserPanel}
              className="header-button"
            >
              User Settings
            </Button>
          )}

          <Button
            color="inherit"
            onClick={handleUserDetails}
            className="header-button"
          >
            User Details
          </Button>

          <Button
            color="inherit"
            onClick={handleLogoutClick}
            className="header-button"
          >
            Logout
          </Button>
        </Box>
      </Toolbar>

      <LogoutDialog
        open={showLogoutDialog}
        onConfirm={handleLogoutConfirm}
        onClose={handleLogoutCancel}
      />
    </AppBar>
  );
};

export default Header;
