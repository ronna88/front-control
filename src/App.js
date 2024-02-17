import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';
import * as React from 'react';
import { baselightTheme } from "./theme/DefaultColors";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {routing}
      <ToastContainer autoClose={4000} />
    </ThemeProvider>
  );
}

export default App;
