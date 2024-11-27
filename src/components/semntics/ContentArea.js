import React from "react";
import { Route, Routes } from "react-router-dom";
import AllEmployees from '../pages/allBusiness';
import Clients from "../pages/categories";
import ProjetsPage from "../pages/plans";
import PaymentPage from "../pages/PaymentPage";
import SettingAndConfi from "../pages/SettingAndConfi";
import DashBoard from "../pages/DashBoard";
import TermsAndConditions from "../pages/TermsAndConditions";
import BannerPage from "../pages/banner";
import NotFound from "../error/NotFound";
import ForgotPassword from "../pages/forgotPassword";
import TrashPlan from "../pages/TrashPlan";
import TrashCategories from "../pages/TrashCategories";
import TrashBusiness from "../pages/TrashBusiness";
import TrashBanner from "../pages/TrashBanner";

function ContentArea() {
  return (
    <Routes>
      {/* Nested Routes for the app */}
      <Route path="/" element={<DashBoard />} />
      <Route path="/business" element={<AllEmployees />} />
      <Route path="/trashbusiness" element={<TrashBusiness />} />

      <Route path="/categories" element={<Clients />} />
      <Route path="/trashcategories" element={<TrashCategories />} />
      
      <Route path="/plans" element={<ProjetsPage />} />
      <Route path="/trashplans" element={<TrashPlan/>} />

      <Route path="/paymentpage" element={<PaymentPage />} />
      
      <Route path="/terms" element={<TermsAndConditions />} />
      
      <Route path="/settingandconfi" element={<SettingAndConfi />} />
      
      <Route path="/banner" element={<BannerPage />} />
      <Route path="/trashbanner" element={<TrashBanner />} />

      
      {/* Catch-all Route for 404 inside nested routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default ContentArea;
