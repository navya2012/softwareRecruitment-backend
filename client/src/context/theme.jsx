// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    h5:{
      color:'#0557A2',
      fontWeight:700,
      lineHeight:'30px'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor:'#0557A2',
          borderRadius:'12px',
          width:'100%',
          padding:'8px',
          height:'56px',
          fontWeight:700,
          fontSize:'16px'
        },
      }
    }
  }
  // Add other theme customizations here
});

export default theme;
