import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/auth/ProtectedRoute";
import { Home as HomePage, Login as LoginPage } from "@/page";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cat" element={<ProtectedRoute element={<LoginPage />} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
