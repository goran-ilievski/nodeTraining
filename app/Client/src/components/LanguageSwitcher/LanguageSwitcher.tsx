import React, { useState } from "react";
import { Button, Menu, MenuItem, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import "flag-icons/css/flag-icons.min.css";
import "./LanguageSwitcher.styled.css";

interface Language {
  code: string;
  name: string;
  flagCode: string;
}

const languages: Language[] = [
  { code: "en", name: "English", flagCode: "gb" },
  { code: "mk", name: "Македонски", flagCode: "mk" },
  { code: "de", name: "Deutsch", flagCode: "de" },
  { code: "fr", name: "Français", flagCode: "fr" },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    handleClose();
  };

  return (
    <Box className="language-switcher">
      <Button
        variant="outlined"
        onClick={handleClick}
        className="language-button"
        size="small"
      >
        <span className={`fi fi-${currentLanguage.flagCode} flag-icon`}></span>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="language-menu"
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            selected={lang.code === i18n.language}
          >
            <span className={`fi fi-${lang.flagCode} flag-icon-menu`}></span>
            <span className="lang-name">{lang.name}</span>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSwitcher;
