import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const auth = JSON.parse(localStorage.getItem("_L"));
  const adminAuth = JSON.parse(localStorage.getItem("_A"));

  return auth && !adminAuth ? <Outlet /> : <Navigate to={"/"} />;
}
