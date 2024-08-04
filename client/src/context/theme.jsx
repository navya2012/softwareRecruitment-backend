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
    h5: {
      color: '#0557A2',
      fontWeight: 700,
      lineHeight: '30px'
    },
    body1: {
      fontWeight: 400,
      fontSize:'18px'
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
          borderRadius: '45px',
          color:'white',
          fontSize: '1.25rem',
          height: '55px',
          fontWeight: 700,
          margin: '20px 0',
          width:'100%'
        }
      }
    }
  }
  // Add other theme customizations here
});

export default theme;
