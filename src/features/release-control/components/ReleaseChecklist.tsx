import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type { ReleaseCheck } from "../release.types";
import { useReleaseReviewDispatch, useReleaseReviewState } from "../state/ReleaseReviewContext";
import { ReleaseCheckRow } from "./ReleaseCheckRow";

export function ReleaseChecklist({ checks }: { checks: ReleaseCheck[] }) {
  const state = useReleaseReviewState();
  const dispatch = useReleaseReviewDispatch();
  if (checks.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          border: "1px dashed",
          borderColor: "divider",
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography component="h3" variant="h3">
          Nessun controllo con questo stato
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Cambia il filtro per tornare alla checklist completa.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box component="ul" sx={{ m: 0, p: 0, display: "grid", gap: 1.5 }}>
      {checks.map((check) => (
        <ReleaseCheckRow
          key={check.id}
          check={check}
          status={state.statusByCheckId[check.id] ?? "pending"}
          onPass={(checkId) => dispatch({ type: "checkPassed", checkId })}
          onBlock={(checkId) => dispatch({ type: "checkBlocked", checkId })}
          onReopen={(checkId) => dispatch({ type: "checkReopened", checkId })}
        />
      ))}
    </Box>
  );
}
