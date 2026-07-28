import RestartAltOutlined from '@mui/icons-material/RestartAltOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  useReleaseReviewState,
} from '../state/ReleaseReviewContext';
import { summarizeReview } from '../state/releaseReviewReducer';

const outcomeCopy = {
  'in-progress': {
    title: 'Review in corso',
    description: 'Completa tutti i controlli prima di confermare il rilascio.',
  },
  blocked: {
    title: 'Rilascio bloccato',
    description: 'Riapri i controlli bloccati dopo aver risolto i problemi.',
  },
  ready: {
    title: 'Pronto al rilascio',
    description: 'Tutti i controlli hanno esito positivo.',
  },
};

export function ReleaseSummary() {
  const state = useReleaseReviewState();
  const summary = summarizeReview(state);
  const copy = outcomeCopy[summary.outcome];

  return (
    <Paper
      component="aside"
      aria-labelledby="review-summary-heading"
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        p: { xs: 2.5, sm: 3 },
        position: { md: 'sticky' },
        top: { md: 24 },
      }}
    >
      <Typography id="review-summary-heading" component="h2" variant="h2">
        Esito della review
      </Typography>
      <Box aria-live="polite" sx={{ mt: 3 }}>
        <Typography component="p" sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
          {copy.title}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.75 }}>
          {copy.description}
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Stack spacing={1.5}>
        <SummaryRow label="Superati" value={summary.passed} />
        <SummaryRow label="Bloccati" value={summary.blocked} />
        <SummaryRow label="Da verificare" value={summary.pending} />
      </Stack>

      <Button
        type="button"
        variant="outlined"
        startIcon={<RestartAltOutlined aria-hidden="true" />}
        disabled
        fullWidth
        sx={{ mt: 3 }}
      >
        Azzera review
      </Button>
      <Typography color="text.secondary" variant="body2" sx={{ mt: 1.5 }}>
        Attiverai le azioni dopo aver collegato reducer e Context.
      </Typography>
    </Paper>
  );
}

function SummaryRow({ label, value }: { label: string; value: number }) {
  return (
    <Stack direction="row" sx={{ justifyContent: 'space-between', gap: 2 }}>
      <Typography color="text.secondary">{label}</Typography>
      <Typography sx={{ fontWeight: 700 }}>{value}</Typography>
    </Stack>
  );
}
