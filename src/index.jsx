import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <AppRouter />
  </React.StrictMode>
);

