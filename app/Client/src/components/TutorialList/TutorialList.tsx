import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { tutorialAPI } from "../../api";
import "./TutorialList.styled.css";

interface TutorialListProps {
  onNavigate: (view: string) => void;
}

const TutorialList: React.FC<TutorialListProps> = () => {
  const { t } = useTranslation();
  const {
    data: tutorials = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tutorials"],
    queryFn: tutorialAPI.getAll,
    enabled: true,
  });

  return (
    <Box className="tutorial-container">
      <Box className="tutorial-header">
        <Typography variant="h4" className="tutorial-title">
          {t("tutorials.title")}
        </Typography>
      </Box>

      {isLoading && <CircularProgress />}

      {error && (
        <Typography color="error">
          {t("tutorials.errorFetching")}: {(error as Error).message}
        </Typography>
      )}

      {tutorials.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t("tutorials.id")}</TableCell>
                <TableCell>{t("tutorials.titleColumn")}</TableCell>
                <TableCell>{t("tutorials.description")}</TableCell>
                <TableCell>{t("tutorials.published")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tutorials.map((tutorial) => (
                <TableRow key={tutorial.id}>
                  <TableCell>{tutorial.id}</TableCell>
                  <TableCell>{tutorial.title}</TableCell>
                  <TableCell>{tutorial.description}</TableCell>
                  <TableCell>
                    {tutorial.published
                      ? t("tutorials.yes")
                      : t("tutorials.no")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {!isLoading && tutorials.length === 0 && !error && (
        <Typography className="tutorial-empty-message">
          {t("tutorials.noTutorials")}
        </Typography>
      )}
    </Box>
  );
};

export default TutorialList;
