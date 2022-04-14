import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MyRoutes from './routes/MyRoutes';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MyRoutes />
  </React.StrictMode>
);

reportWebVitals();
