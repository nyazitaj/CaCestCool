import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import ForgotPassword from "../pages/ForgotPassword";
import Nopage from "../pages/Nopage";

export default function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
  );
}