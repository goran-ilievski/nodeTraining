import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import LogoutDialog from "../LogoutDialog";
import LanguageSwitcher from "../LanguageSwitcher";
import "./Header.styled.css";

interface HeaderProps {
  onNavigate: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleHome = () => {
    onNavigate("tutorials");
  };

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
        <IconButton
          color="inherit"
          onClick={handleHome}
          className="header-home-button"
          aria-label="home"
        >
          <HomeIcon />
        </IconButton>

        <Box className="header-user-section">
          <LanguageSwitcher />

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
              {t("header.userSettings")}
            </Button>
          )}

          <Button
            color="inherit"
            onClick={handleUserDetails}
            className="header-button"
          >
            {t("header.userDetails")}
          </Button>

          <Button
            color="inherit"
            onClick={handleLogoutClick}
            className="header-button"
          >
            {t("header.logout")}
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
