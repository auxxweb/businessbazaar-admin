import React from "react";
import { Route, Routes } from "react-router-dom"
import AllEmployees from '../pages/allBusiness'
import Clients from "../pages/categories"
// import ClientDetails from "../pages/ClientDetails"
import ProjetsPage from "../pages/plans";
import PaymentPage from "../pages/PaymentPage";
import SettingAndConfi from "../pages/SettingAndConfi";
import DashBoard from "../pages/DashBoard";

function ContentArea() {
  return (
    <Routes> {/* Use Routes to define all your app routes */}
      <Route path="/" element={<DashBoard />} />
      <Route path="/business" element={<AllEmployees />} />
      <Route path="/categories" element={<Clients />} />
      {/* <Route path="/clientsdetails" element={<ClientDetails />} /> */}
      <Route path="/plans" element={<ProjetsPage />} />       
      <Route path="/paymentpage" element={<PaymentPage />} />       
      <Route path="/settingandconfi" element={<SettingAndConfi />} />   
    </Routes>
  );
}

export default ContentArea;
