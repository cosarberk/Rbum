import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
// A custom theme for this app
const theme = createTheme({
 
  palette: {
    mode:'dark',
    primary: {
      main: '#4cb5b0',
    },
    secondary: {
      main: '#039be5',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;