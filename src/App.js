import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./pages/HeroSection";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CommanDashboard from "./pages/CommanDashboard";
import BaseCommanderDashboard from "./pages/BaseCommandar";
import LogisticsDashboard from "./pages/LogisticDashbord";
import ProtectedRoute from "./components/ProtectedRoutes";

import PurchasesPage from "./pages/PurchasesPage";
import TransfersPage from "./pages/TransfersPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import ExpendituresPage from "./pages/ExpendituresPage";
import AdminDashboard from "./pages/AdminDashboard"; 

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<CommanDashboard />} />

        {/* Role-based Routes */}
        <Route
          path="/logistics"
          element={
            <ProtectedRoute allowedRoles={["Logistics Officer", "Admin"]}>
              <LogisticsDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/commander"
          element={
            <ProtectedRoute allowedRoles={["Base Commander", "Admin"]}>
              <BaseCommanderDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin-Only Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin-Only Data Pages */}
        <Route
          path="/purchases"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <PurchasesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transfers"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <TransfersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assignments"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AssignmentsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/expenditures"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <ExpendituresPage />
            </ProtectedRoute>
          }
        />

        {/* Default Route - Redirect to home */}
        <Route path="/home" element={<Navigate to="/" replace />} />

        {/* 404 Route */}
        <Route
          path="*"
          element={
            <div className="container mt-4">
              <div className="alert alert-warning text-center">
                <h4>404 - Page Not Found</h4>
                <p>The page you're looking for doesn't exist.</p>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
