import BlockOutlined from '@mui/icons-material/BlockOutlined';
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined';
import PendingActionsOutlined from '@mui/icons-material/PendingActionsOutlined';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useReleaseReviewState } from '../state/ReleaseReviewContext';
import { summarizeReview } from '../state/releaseReviewReducer';

export function ReviewProgress() {
  const summary = summarizeReview(useReleaseReviewState());

  const outcome =
    summary.outcome === 'ready'
      ? { label: 'Pronto al rilascio', background: '#DCFCE7', color: '#14532D' }
      : summary.outcome === 'blocked'
        ? { label: 'Rilascio bloccato', background: '#FEE2E2', color: '#7F1D1D' }
        : { label: 'Review in corso', background: '#DBEAFE', color: '#0B2545' };

  return (
    <Box sx={{ mt: 3, maxWidth: 760 }} aria-live="polite">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        sx={{ alignItems: { sm: 'center' }, justifyContent: 'space-between' }}
      >
        <Chip
          label={outcome.label}
          sx={{
            alignSelf: 'flex-start',
            bgcolor: outcome.background,
            color: outcome.color,
            fontWeight: 700,
          }}
        />
        <Typography sx={{ color: '#CBD5E1', fontWeight: 700 }}>
          {summary.passed} di {summary.total} controlli superati
        </Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={summary.progress}
        aria-label="Avanzamento della review"
        aria-valuetext={`${summary.passed} controlli superati su ${summary.total}`}
        sx={{ mt: 1.5, bgcolor: 'rgba(255,255,255,0.2)' }}
      />
      <Stack
        direction="row"
        spacing={2.5}
        useFlexGap
        sx={{ mt: 1.5, color: '#E2E8F0', flexWrap: 'wrap' }}
      >
        <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
          <CheckCircleOutlined fontSize="small" aria-hidden="true" />
          <Typography variant="body2">{summary.passed} superati</Typography>
        </Stack>
        <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
          <BlockOutlined fontSize="small" aria-hidden="true" />
          <Typography variant="body2">{summary.blocked} bloccati</Typography>
        </Stack>
        <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
          <PendingActionsOutlined fontSize="small" aria-hidden="true" />
          <Typography variant="body2">{summary.pending} da verificare</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
