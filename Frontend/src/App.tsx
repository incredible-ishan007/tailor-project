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
  return (
    <BrowserRouter>
      {/* <Routes>
        <Route path="/" element={<MainSignup />} />

        <Route path="/verify" element={<MainVerifyOtp />} />
        <Route path="/login" element={<MainLogin />} />

        <Route
          path="/user"
          element={
            localStorage.getItem("role")
              ? <NavBarMain />
              : <Navigate to="/" />
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
            localStorage.getItem("role") === "tailor"
              ? <TailorNavBar />
              : <Navigate to="/" />
          }
        >
          <Route index element={<UserHome />} />
          <Route path="tailor_profile" element={<TailorProfile />} />
        </Route>

      </Routes> */}
      {/* <LandingPage></LandingPage> */}
      {/* <MainSignup></MainSignup> */}
      {/* <MainLogin></MainLogin> */}
      <MainVerifyOtp></MainVerifyOtp>
    </BrowserRouter>
  );
}

export default App;