import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // or wherever your App component is located
import './index.css'; // optional, depending on your styles

// Create a root and render the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
