import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signin from '../component/login/Login';
import Signup from '../component/signup/Signup';
import ForgotPassword from "../component/passwordrecovery/PassRecovery";
import Dashboard from "../component/dashboard/dashboard";
import Nopage from "../component/nopage/Nopage";

export default function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>

      <Route exact path="/" element={
        localStorage.getItem('token') == undefined || localStorage.getItem('token') == '' ? <Signin /> : <Navigate to="/dashboard" />
      }
      >
        <Route exact path="/" element={<Signin />} />
      </Route>

      <Route exact path="/signup" element={
        localStorage.getItem('token') == undefined || localStorage.getItem('token') == '' ? <Signup /> : <Navigate to="/dashboard" />
      }
      >
        <Route exact path="/signup" element={<Signup />} />
      </Route>

      <Route exact path="/forgot-password" element={
        localStorage.getItem('token') == undefined || localStorage.getItem('token') == '' ? <ForgotPassword /> : <Navigate to="/dashboard" />
      }
      >
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route exact path="/dashboard" element={
        localStorage.getItem('token') != undefined && localStorage.getItem('token') != '' ? <Dashboard /> : <Navigate to="/" />
      }
      >
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<Nopage />} />

    </Routes>
    </BrowserRouter >
  );
}