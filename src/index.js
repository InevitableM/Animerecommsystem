import React from 'react';
import ReactDOM from 'react-dom/client';
import A from './a'; // Ensure the correct import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <A /> 
  </React.StrictMode>
);