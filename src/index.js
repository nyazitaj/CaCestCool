import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MyRoutes from './routes/MyRoutes';
import reportWebVitals from './reportWebVitals';

/* import MyFunctionsObj from './MyFunctions'; */
/* import SignupUser, { LoginUser } from './MyFunctions'; */

import MyFunctions from './MyFunctions';

const MyFunctionsObj = new MyFunctions();


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MyRoutes />
  </React.StrictMode>
);


/* console.log(MyFunctionsObj.SignupUser());
console.log(MyFunctionsObj.LoginUser()); */

/* console.log(SignupUser());
console.log(LoginUser()); */

console.log(MyFunctionsObj);

reportWebVitals();
