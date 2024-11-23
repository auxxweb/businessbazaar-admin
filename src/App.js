import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Browse from './components/semntics/Browse';
import Login from './components/pages/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './components/pages/forgotPassword';
import ChangePassword from './components/pages/changePassword';

function App() {
  const token = useSelector((state) => state.authority.isAuthenticated);

  return (

    <BrowserRouter>

      <Routes>
        {/* Protected Route - Browse */}
        <Route path="/*" element={token ? <Browse /> : <Navigate to="/login" />} />
        {/* Public Route - Login */}
        <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/changePassword/:id" element={<ChangePassword />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

    </BrowserRouter>
  );
}

export default App;
