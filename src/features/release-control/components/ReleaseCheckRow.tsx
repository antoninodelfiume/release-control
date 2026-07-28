import BlockOutlined from '@mui/icons-material/BlockOutlined';
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined';
import ReplayOutlined from '@mui/icons-material/ReplayOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  releaseAreaLabels,
  reviewStatusLabels,
  type ReleaseCheck,
  type ReviewStatus,
} from '../release.types';

const statusColor: Record<
  ReviewStatus,
  'default' | 'success' | 'error'
> = {
  pending: 'default',
  passed: 'success',
  blocked: 'error',
};

type ReleaseCheckRowProps = {
  check: ReleaseCheck;
  status: ReviewStatus;
};

export function ReleaseCheckRow({
  check,
  status,
}: ReleaseCheckRowProps) {
  return (
    <Paper
      component="li"
      elevation={0}
      sx={{
        listStyle: 'none',
        border: '1px solid',
        borderColor: status === 'blocked' ? 'error.light' : 'divider',
        minWidth: 0,
        p: { xs: 2, sm: 2.5 },
      }}
    >
      <Stack spacing={2}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: 1.5,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              component="p"
              variant="caption"
              sx={{ color: 'primary.dark', fontWeight: 700 }}
            >
              {releaseAreaLabels[check.area]} · {check.owner}
            </Typography>
            <Typography component="h3" variant="h3" sx={{ mt: 0.5 }}>
              {check.title}
            </Typography>
          </Box>
          <Chip
            label={reviewStatusLabels[status]}
            color={statusColor[status]}
            variant={status === 'pending' ? 'outlined' : 'filled'}
            size="small"
          />
        </Box>

        <Typography color="text.secondary" sx={{ overflowWrap: 'anywhere' }}>
          {check.description}
        </Typography>

        <Stack
          role="group"
          aria-label={`Azioni per ${check.title}`}
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
        >
          <Button
            type="button"
            variant="contained"
            startIcon={<CheckCircleOutlined aria-hidden="true" />}
            disabled
          >
            Superato
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="error"
            startIcon={<BlockOutlined aria-hidden="true" />}
            disabled
          >
            Blocca
          </Button>
          <Button
            type="button"
            variant="outlined"
            startIcon={<ReplayOutlined aria-hidden="true" />}
            disabled
          >
            Riapri controllo
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
