import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2563EB', dark: '#1D4ED8', contrastText: '#F8FAFC' },
    secondary: { main: '#0B2545', contrastText: '#F8FAFC' },
    background: { default: '#EEF2F7', paper: '#FFFFFF' },
    text: { primary: '#0B172A', secondary: '#475569' },
    divider: '#CBD5E1',
    success: { main: '#18794E' },
    warning: { main: '#A15C00' },
    error: { main: '#B42318' },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: 'Roboto, system-ui, sans-serif',
    h1: {
      fontSize: 'clamp(1.8rem, 4vw, 2.65rem)',
      fontWeight: 700,
      letterSpacing: '-0.03em',
    },
    h2: { fontSize: '1.25rem', fontWeight: 700 },
    h3: { fontSize: '1rem', fontWeight: 700 },
    button: { fontWeight: 700, textTransform: 'none' },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          minHeight: 44,
          '&:active': { transform: 'translateY(1px)' },
        },
      },
    },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiToggleButton: {
      styleOverrides: {
        root: { minHeight: 44, textTransform: 'none', fontWeight: 700 },
      },
    },
    MuiLinearProgress: {
      styleOverrides: { root: { height: 8, borderRadius: 8 } },
    },
  },
});
