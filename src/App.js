import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Browse from './components/semntics/Browse';
import { useSelector } from 'react-redux';
import Login from './components/pages/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const token = useSelector((state) => state.authority.isAuthenticated);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={token ? <Browse /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <Login />}
        />
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
