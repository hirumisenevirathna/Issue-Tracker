import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedLayout from "./components/ProtectedLayout";
import IssueListPage from "./pages/IssueListPage";
import IssueCreatePage from "./pages/IssueCreatePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected area */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/issues" element={<IssueListPage />} />
          <Route path="/issues/new" element={<IssueCreatePage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
