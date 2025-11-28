import React, { useState } from "react";
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
  Pagination,
  Chip,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { tutorialAPI, PaginatedTutorials } from "../../api";
import "./TutorialList.styled.css";

interface TutorialListProps {
  onNavigate: (view: string) => void;
}

const TutorialList: React.FC<TutorialListProps> = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error } = useQuery({
    queryKey: ["tutorials", page],
    queryFn: () => tutorialAPI.getAll(page, limit),
    enabled: true,
  });

  const paginatedData = data as PaginatedTutorials;
  const tutorials = paginatedData?.tutorials || [];
  const totalPages = paginatedData?.totalPages || 1;

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

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
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="tutorial-table-header">
                    {t("tutorials.id")}
                  </TableCell>
                  <TableCell className="tutorial-table-header">
                    {t("tutorials.titleColumn")}
                  </TableCell>
                  <TableCell className="tutorial-table-header">
                    {t("tutorials.description")}
                  </TableCell>
                  <TableCell className="tutorial-table-header" align="center">
                    {t("tutorials.createdBy")}
                  </TableCell>
                  <TableCell className="tutorial-table-header" align="center">
                    {t("tutorials.subscription")}
                  </TableCell>
                  <TableCell className="tutorial-table-header" align="center">
                    {t("tutorials.published")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tutorials.map((tutorial) => (
                  <TableRow key={tutorial.id} className="tutorial-table-row">
                    <TableCell className="tutorial-table-cell">
                      {tutorial.id}
                    </TableCell>
                    <TableCell className="tutorial-table-cell tutorial-title-cell">
                      {tutorial.title}
                    </TableCell>
                    <TableCell className="tutorial-table-cell tutorial-description-cell">
                      {tutorial.description}
                    </TableCell>
                    <TableCell className="tutorial-table-cell" align="center">
                      <Chip
                        label={tutorial.created_by}
                        size="small"
                        color="default"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell className="tutorial-table-cell" align="center">
                      <Chip
                        label={
                          tutorial.subscription_needed
                            ? t("tutorials.yes")
                            : t("tutorials.no")
                        }
                        size="small"
                        color={
                          tutorial.subscription_needed ? "warning" : "default"
                        }
                      />
                    </TableCell>
                    <TableCell className="tutorial-table-cell" align="center">
                      <Chip
                        label={
                          tutorial.published
                            ? t("tutorials.yes")
                            : t("tutorials.no")
                        }
                        size="small"
                        color={tutorial.published ? "success" : "error"}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box className="tutorial-pagination">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              siblingCount={2}
              boundaryCount={0}
              showFirstButton
              showLastButton
            />
          </Box>
        </>
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
