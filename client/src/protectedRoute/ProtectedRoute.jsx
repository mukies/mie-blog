import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const auth = JSON.parse(localStorage.getItem("_L"));

  return auth ? <Outlet /> : <Navigate to={"/login"} />;
}
