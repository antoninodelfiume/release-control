import ErrorOutlineOutlined from '@mui/icons-material/ErrorOutlineOutlined';
import Inventory2Outlined from '@mui/icons-material/Inventory2Outlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  createSimulatedReleaseApi,
  readReleaseApiScenario,
  ReleaseControlPage,
  type ReleaseApi,
  ReleaseReviewProvider,
  useReleaseSnapshot,
} from './features/release-control';

const defaultReleaseApi = createSimulatedReleaseApi({
  scenario: readReleaseApiScenario(window.location.search),
});

export function App({ api = defaultReleaseApi }: { api?: ReleaseApi }) {
  const { state, retry } = useReleaseSnapshot(api);

  if (state.status === 'loading') return <ReleaseLoadingPage />;
  if (state.status === 'error') {
    return (
      <ReleaseMessagePage>
        <Alert
          severity="error"
          icon={<ErrorOutlineOutlined fontSize="inherit" />}
          action={
            <Button color="inherit" type="button" onClick={retry}>
              Riprova
            </Button>
          }
        >
          {state.message}
        </Alert>
      </ReleaseMessagePage>
    );
  }
  if (state.status === 'empty') {
    return (
      <ReleaseMessagePage>
        <Paper
          elevation={0}
          sx={{ border: '1px dashed', borderColor: 'divider', p: 4, textAlign: 'center' }}
        >
          <Inventory2Outlined color="primary" sx={{ fontSize: 40 }} aria-hidden="true" />
          <Typography component="h2" variant="h2" sx={{ mt: 1.5 }}>
            Nessun controllo configurato
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            L’API non ha restituito controlli per questo rilascio.
          </Typography>
        </Paper>
      </ReleaseMessagePage>
    );
  }

  return (
    <ReleaseReviewProvider checks={state.data.checks}>
      <ReleaseControlPage snapshot={state.data} />
    </ReleaseReviewProvider>
  );
}

function ReleaseMessagePage({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: '100dvh', bgcolor: 'background.default' }}>
      <ReleaseHeader />
      <Container component="main" maxWidth="md" sx={{ py: { xs: 4, sm: 7 } }}>
        {children}
      </Container>
    </Box>
  );
}

function ReleaseHeader() {
  return (
    <Box component="header" sx={{ bgcolor: '#0B2545', color: '#F8FAFC' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4.5 } }}>
        <Typography
          component="p"
          variant="overline"
          sx={{ color: '#BFDBFE', fontWeight: 700, letterSpacing: '0.08em' }}
        >
          Release Control
        </Typography>
        <Typography component="h1" variant="h1" sx={{ mt: 1 }}>
          Verifica del rilascio
        </Typography>
      </Container>
    </Box>
  );
}

function ReleaseLoadingPage() {
  return (
    <Box sx={{ minHeight: '100dvh', bgcolor: 'background.default' }}>
      <ReleaseHeader />
      <Container component="main" maxWidth="lg" sx={{ py: { xs: 3, sm: 5 } }}>
        <Typography component="h2" variant="h2">
          Caricamento controlli
        </Typography>
        <Stack spacing={1.5} sx={{ mt: 2.5 }} aria-label="Caricamento in corso">
          {[0, 1, 2].map((item) => (
            <Skeleton key={item} variant="rounded" height={132} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
