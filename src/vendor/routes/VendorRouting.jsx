import { Routes, Route, Navigate } from "react-router-dom";
import VendorLayout from "../layouts/VendorLayout";
import Dashboard from "../pages/Dashboard";
import Services from "../pages/Services";
import Products from "../pages/Products";
import Booking from "../pages/Bookings";
import Earnings from "../pages/Earnings";
import Support from "../pages/Support";
import Settings from "../pages/Settings";
import CompleteProfile from "../pages/CompleteProfile";
import Reviews from "../pages/Reviews";


const VendorRoutes = () => {
  return (
    <Routes>
      <Route element={<VendorLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="services" element={<Services />} />
        <Route path="products" element={<Products />} />
        <Route path="bookings" element={<Booking />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="support" element={<Support />} />
        <Route path="settings" element={<Settings />} />
           <Route path="reviews" element={<Reviews />} />
        <Route path="complete-profile" element={<CompleteProfile />} />
      </Route>
    </Routes>
  );
};

export default VendorRoutes;

