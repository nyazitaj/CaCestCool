import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MyRoutes from './routes/MyRoutes';
import reportWebVitals from './reportWebVitals';
import MyFunctions from './MyFunctions';
const MyFunctionsObj = new MyFunctions();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MyRoutes />
  </React.StrictMode>
);

/* window.addEventListener('load', function() {
  MyFunctionsObj.SignupUser()
}) */

window.onload = () => {
  MyFunctionsObj.SignupUser()
};

reportWebVitals();
