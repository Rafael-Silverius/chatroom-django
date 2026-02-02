import React from "react";
import Login from "./pages/login";
import Register from "./pages/register";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

import ProtectedRoute from "./components/routes/ProtectedRoutes";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
