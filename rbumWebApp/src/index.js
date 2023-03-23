import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from './theme.js'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import  history  from './history';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter history={history} >
  <AuthProvider>
    <ThemeProvider theme={theme}>
    <CssBaseline>
    <SnackbarProvider autoHideDuration={3000} maxSnack={3}>
      <App />
      </SnackbarProvider>
      </CssBaseline>
    </ThemeProvider>
  </AuthProvider>
</BrowserRouter>
);

