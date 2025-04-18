import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ThemeProvider } from './hooks/theme';
import { AuthProvider } from './hooks/auth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
         <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

