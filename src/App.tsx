import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import PublicLayout from './Routes/PublicLayout';
import PrivateLayout from './Routes/PrivateLayout';
import { ToastProvider } from './Components/Toast';
import { privateRoutes, publicRoutes } from './Routes/routesConfig';

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: "'Georgia', 'Times New Roman', Times, serif",
    },
  });

  return (
    <ToastProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route element={<PublicLayout />}>
              {publicRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Route>

            <Route element={<PrivateLayout />}>
              {privateRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ToastProvider>
  );
};

export default App;
