import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import type { ReleaseSnapshot, ReviewFilter } from "../release.types";
import { ReleaseChecklist } from "./ReleaseChecklist";
import { ReleaseSummary } from "./ReleaseSummary";
import { ReviewProgress } from "./ReviewProgress";
import { useReleaseReviewState } from "../state/ReleaseReviewContext";
import { useState } from "react";

const filters: Array<{ value: ReviewFilter; label: string }> = [
  { value: "all", label: "Tutti" },
  { value: "pending", label: "Da verificare" },
  { value: "passed", label: "Superati" },
  { value: "blocked", label: "Bloccati" },
];

export function ReleaseControlPage({
  snapshot,
}: {
  snapshot: ReleaseSnapshot;
}) {
  const [filter, setFilter] = useState<ReviewFilter>('all');
  const state = useReleaseReviewState();

  const visibleChecks =
    filter === "all"
      ? snapshot.checks
      : snapshot.checks.filter(
          (check) => state.statusByCheckId[check.id] === filter,
        );

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        bgcolor: "background.default",
        overflowX: "hidden",
      }}
    >
      <Box component="header" sx={{ bgcolor: "#0B2545", color: "#F8FAFC" }}>
        <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4.5 } }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ alignItems: { sm: "center" } }}
          >
            <Typography
              component="p"
              variant="overline"
              sx={{
                color: "#BFDBFE",
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              Release Control
            </Typography>
            <Chip
              label={snapshot.environment}
              size="small"
              sx={{
                alignSelf: "flex-start",
                bgcolor: "#DBEAFE",
                color: "#0B2545",
                fontWeight: 700,
              }}
            />
          </Stack>
          <Typography component="h1" variant="h1" sx={{ mt: 1 }}>
            {snapshot.productName} {snapshot.version}
          </Typography>
          <Typography sx={{ mt: 1, maxWidth: 680, color: "#CBD5E1" }}>
            Verifica i controlli tecnici e registra l’esito della review.
          </Typography>
          <ReviewProgress />
        </Container>
      </Box>

      <Box component="main" id="main-content">
        <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 5 } }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "minmax(0, 1.75fr) minmax(280px, 0.75fr)",
              },
              alignItems: "start",
              gap: 3,
            }}
          >
            <Paper
              component="section"
              aria-labelledby="release-checks-heading"
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                minWidth: 0,
                p: { xs: 2, sm: 3 },
              }}
            >
              <Stack spacing={2.5}>
                <Box>
                  <Typography
                    id="release-checks-heading"
                    component="h2"
                    variant="h2"
                  >
                    Controlli di rilascio
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 0.75 }}>
                    Registra un esito per ciascun controllo.
                  </Typography>
                </Box>

                <ToggleButtonGroup
                  value={filter}
                  exclusive
                  aria-label="Filtra i controlli per stato"
                  size="small"
                  onChange={(_event, nextFilter: ReviewFilter | null) => {
                    if (nextFilter) setFilter(nextFilter);
                  }}
                  sx={{
                    alignSelf: "flex-start",
                    width: { xs: "100%", sm: "auto" },
                    display: { xs: "grid", sm: "inline-flex" },
                    gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))" },
                    "& .MuiToggleButton-root": {
                      minWidth: 0,
                    },
                  }}
                >
                  {filters.map((item) => (
                    <ToggleButton key={item.value} value={item.value}>
                      {item.label}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>

                <ReleaseChecklist checks={visibleChecks} />
              </Stack>
            </Paper>

            <ReleaseSummary />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
