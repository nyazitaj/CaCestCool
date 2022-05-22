import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from '../component/login/Login';
import Signup from '../component/signup/Signup';
import ForgotPassword from "../component/passwordrecovery/PassRecovery";
import Dashboard from "../component/dashboard/dashboard";
import Nopage from "../component/nopage/Nopage";

export default function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {
          /* localStorage.getItem('token') != undefined && localStorage.getItem('token') != '' ?
            <Route path="/" element={<Dashboard />} /> : */
            <Route path="/" element={<Signin />} />
        }

        {
          /* localStorage.getItem('token') != undefined && localStorage.getItem('token') != '' ?
            <Route path="/signup" element={<Dashboard />} /> : */
            <Route path="/signup" element={<Signup />} />
        }

        <Route path="/forgot-password" element={<ForgotPassword />} />

        {
          /* localStorage.getItem('token') != undefined && localStorage.getItem('token') != '' ? */
            <Route path="/dashboard" element={<Dashboard />} /> /* :
            <Route path="/dashboard" element={<Signin />} /> */
        }

        <Route path="*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
  );
}