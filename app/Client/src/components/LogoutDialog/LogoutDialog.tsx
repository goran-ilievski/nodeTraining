import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import "./LogoutDialog.styled.css";

interface LogoutDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutDialog: React.FC<LogoutDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle className="logout-dialog-title">
        {t("logout.title")}
      </DialogTitle>
      <DialogContent className="logout-dialog-content">
        <Typography>{t("logout.message")}</Typography>
      </DialogContent>
      <DialogActions className="logout-dialog-actions">
        <Button onClick={onClose} variant="outlined" color="secondary">
          {t("logout.no")}
        </Button>
        <Button onClick={onConfirm} variant="contained" color="primary">
          {t("logout.yes")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog;
