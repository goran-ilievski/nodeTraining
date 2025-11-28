import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import LogoutDialog from "../LogoutDialog";
import "./Header.styled.css";

interface HeaderProps {
  onNavigate: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleSettingsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (user?.role === "superuser") {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserPanel = () => {
    handleClose();
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

          {user.role !== "guest" && (
            <>
              <Button
                color="inherit"
                onClick={handleSettingsClick}
                className="header-button"
              >
                Settings
              </Button>

              {user.role === "superuser" && (
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleUserPanel}>User Panel</MenuItem>
                </Menu>
              )}
            </>
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
        onCancel={handleLogoutCancel}
      />
    </AppBar>
  );
};

export default Header;
