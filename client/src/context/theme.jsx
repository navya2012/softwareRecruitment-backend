// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  MuiBox: {
    styleOverrides: {
      root: {
        fontFamily: "'Montserrat', sans-serif",
      },
    }
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    h4: {
      color: '#0557A2',
      fontWeight: 700,
      lineHeight: '30px'
    },
    welcomeHeader: {
      fontWeight: 600,
      textAlign: 'center',
      marginBottom: '20px',
    },
    welcomeSubheader: {
      marginBottom: '5px',
      fontSize: '1.125rem',
      textAlign: 'center',
      color: '#0557A2'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#0557A2',
          borderRadius: '12px',
          minWidth: '100%',
          padding: '8px',
          height: '56px',
          fontWeight: 700,
          fontSize: '16px'
        },
      }
    }
  }
  // Add other theme customizations here
});

export default theme;
