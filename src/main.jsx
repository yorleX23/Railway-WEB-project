import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// ReactDOM.createRoot монтує наш React-додаток у HTML-елемент з id="root"
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode допомагає виявляти потенційні проблеми в додатку під час розробки 
  // (наприклад, застарілі методи циклу життя або небезпечні побічні ефекти)
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)