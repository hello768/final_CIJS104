import React from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import NavBar from "/Users/quanamg/Documents/MindX ReactJs/final/src/components/NavBar.jsx";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import CustomerDashboard from "./pages/customer/CustomerDash";
import OrderHistory from "./pages/customer/OrderHistory";
import AccountPage from "./pages/customer/AccountPage";
import SupportPage from "./pages/customer/SupportPage";

import CarUploadPage from "/Users/quanamg/Documents/MindX ReactJs/final/src/components/CarUploadPage.jsx";
import CarDetailModel from "/Users/quanamg/Documents/MindX ReactJs/final/src/components/CarDetailModel.jsx";
import { UserProvider } from "./contexts/UserContext";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  return (
    <UserProvider>
      <ErrorBoundary>
        <Routes>
          <Route path="navbar" element={<NavBar/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/main" element={<CustomerDashboard />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="support" element={<SupportPage />} />

          <Route path="upload-cars" element={<CarUploadPage />} />
          <Route path="cardetail" element={<CarDetailModel/>} />
        </Routes>
      </ErrorBoundary>
    </UserProvider>
  );
}

