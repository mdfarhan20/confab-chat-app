import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes } from 'react-router-dom';
import { AuthProvider } from 'context/AuthContext.jsx';
import App from './App.jsx';
import './index.css';
import { AppProvider } from 'context/AppContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter basename="/confab-chat-app">
        <AuthProvider>
          <AppProvider>
            <App />
            </AppProvider>
          </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>,
);
