import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher";
import "./PublicHeader.styled.css";

const PublicHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <AppBar position="static" className="public-header">
      <Toolbar className="public-header-toolbar">
        <Typography variant="h6" className="public-header-title">
          {t("app.title")}
        </Typography>

        <Box className="public-header-language">
          <LanguageSwitcher />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default PublicHeader;
