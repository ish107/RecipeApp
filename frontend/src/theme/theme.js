import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#9DBF9E', // Green shade
      contrastText: '#3B2A2A', // Chocolate brown for contrast
    },
    secondary: {
      main: '#3CB371', // Lighter green
    },
    background: {
      default: '#f4f4f4', // Light background color
    },
    text: {
      primary: '#3B2A2A', // Chocolate brown
    },
  },
  typography: {
    fontFamily: 'Monospace, Arial, sans-serif',
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none', // Disables uppercase on buttons
    },
  },
  spacing: 8, // Adjusts spacing, theme.spacing(1) = 8px
});
