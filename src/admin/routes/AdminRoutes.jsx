import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Orders";
import Services from "../pages/Services";
import Categories from "../pages/Categories";
import Ads from "../pages/Ads";
import ReviewsRatings from "../pages/ReviewRatings";
import Products from "../pages/Products";
import UsersB2C from "../pages/UsersB2C";
import VendorsB2B from "../pages/VendorsB2B";
import Payments from "../pages/Payments";
import Settings from "../pages/Settings";


const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="services" element={<Services />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="users/b2c" element={<UsersB2C />} />
        <Route path="users/b2b" element={<VendorsB2B />} />
        <Route path="ads" element={<Ads />} />
        <Route path="payments" element={<Payments />} />
        <Route path="reviews" element={<ReviewsRatings/>} />
        <Route path="settings" element={<Settings/>} />
        {/* baaki pages yahin add honge */}
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
