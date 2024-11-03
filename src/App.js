import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Browse from './components/semntics/Browse';
import { useSelector } from 'react-redux';
import Login from './components/pages/login';

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
    </BrowserRouter>
  );
}

export default App;
