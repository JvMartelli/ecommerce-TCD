import { useAuth } from "@/auth/AuthProvider"
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: any) {
  const auth = useAuth();
  if (!auth?.user || !auth?.token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
