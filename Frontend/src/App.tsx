import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainSignup from "./main_signup";
import MainLogin from "./main_login";
import MainVerifyOtp from "./MainVerifyOtp";

import NavBarMain from "./user_navbar";
import TailorNavBar from "./tailor_navbar";

import UserHome from "./User_home";
import CustomerProfile from "./customer_profile";
import FindTailor from "./tailor_search";
import TailorReview from "./rating";

import TailorProfile from "./tailor_profile";
import LandingPage from "./first";

function App() {
  const isUserAuthenticated = () => Boolean(localStorage.getItem("token"));
  const getUserRole = () => localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<MainSignup />} />
        <Route path="/login" element={<MainLogin />} />
        <Route path="/verify-otp" element={<MainVerifyOtp />} />

        <Route
          path="/user"
          element={
            isUserAuthenticated() ? <NavBarMain /> : <Navigate to="/login" replace />
          }
        >
          <Route index element={<UserHome />} />
          <Route path="profile" element={<CustomerProfile />} />
          <Route path="search" element={<FindTailor />} />
          <Route path="ratings" element={<TailorReview />} />
        </Route>

        <Route
          path="/tailor"
          element={
            isUserAuthenticated() && getUserRole() === "tailor" ? (
              <TailorNavBar />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<UserHome />} />
          <Route path="tailor_profile" element={<TailorProfile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;