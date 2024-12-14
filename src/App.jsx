import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./components/Auth"; // Impor context
import LoginPage from "./components/Login";
import Induk from "./pages/Induk";
import SkillComponent from "./pages/Skill";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Mendapatkan user dari context
  if (!user || user.role !== "admin") {
    return <Navigate to="/" />; // Redirect jika bukan admin
  }
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Induk/>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Induk />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
