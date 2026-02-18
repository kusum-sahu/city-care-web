import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/public/Home";
import ServicePage from "./pages/public/service/ServicePage";
import Signup from "./pages/public/auth/SignUp";
import Login from "./pages/public/auth/Login";
import Profile from "./pages/public/profile/Profile";
import ProfileServices from "./pages/public/profile/ProfileServices";
import ForgotPassword from "./pages/public/auth/ForgotPassword";
import ResetPassword from "./pages/public/auth/ResetPassword";
import ServiceDetailsPage from "./pages/public/service/ServiceDetailsPage";
import ServiceRatingPage from "./pages/public/service/ServiceRatingPage";
import ConfirmOtp from "./pages/public/auth/ConfirmOtp";
import AdminRoutes from "./admin/routes/AdminRoutes"; 
import ConfirmBooking from "./pages/public/booking/ConfirmBoking";
import BookingSummary from "./pages/public/booking/BookingSummery";
import BookingSuccess from "./pages/public/booking/BookingSuccess";
import BookingInProgress from "./pages/public/booking/BookingInprogress";
import VendorRoutes from "./vendor/routes/VendorRouting";
import ServiceSlotPage from "./pages/public/service/ServiceSlotPage";
// import VendorSignup from "./pages/public/auth/vendorRegister";
import VendorRegister from "./pages/public/auth/vendorRegister";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/service/:serviceType" element={<ServicePage />} />
        <Route path="/service/:serviceType/:serviceId" element={<ServiceDetailsPage/>}/>
        <Route path="/service/:serviceType/:serviceId/rate" element={<ServiceRatingPage />}/>
      <Route
        path="/service/:serviceType/:serviceId/slot"
        element={<ServiceSlotPage />}
      />

        {/* LOGIN ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/login/b2c" element={<Login />} />
        <Route path="/login/b2b" element={<Login />} />

        {/* SIGNUP ROUTES */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/b2c" element={<Signup />} />
        <Route path="/signup/b2b" element={<Signup />} />
        
         <Route path="/profile" element={<Profile />} />
         <Route path="/profile/services" element={<ProfileServices />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/confirm-otp" element={<ConfirmOtp />} />
        
      <Route path="/admin/*" element={<AdminRoutes />} />
       <Route path="/booking/confirm" element={<ConfirmBooking />} />
      <Route path="/booking/summary" element={<BookingSummary />} />
      <Route path="/booking/in-progress" element={<BookingInProgress />} />
      <Route path="/booking/success" element={<BookingSuccess />} />
      <Route path="/vendor/register" element={<VendorRegister />} />

      {/* <Route path="/vendor/register" element={<VendorSignup />} />  */}


      {/* Vendor */}
<Route path="/vendor/*" element={<VendorRoutes />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
