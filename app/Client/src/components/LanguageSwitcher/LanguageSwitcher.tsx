import React from "react";
import { Button, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.styled.css";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Box className="language-switcher">
      <Button
        variant={i18n.language === "en" ? "contained" : "outlined"}
        onClick={() => changeLanguage("en")}
        size="small"
      >
        EN
      </Button>
      <Button
        variant={i18n.language === "mk" ? "contained" : "outlined"}
        onClick={() => changeLanguage("mk")}
        size="small"
      >
        MK
      </Button>
    </Box>
  );
};

export default LanguageSwitcher;
