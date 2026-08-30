import { Navigate, Outlet, useLocation } from "react-router-dom";
import Spinner from "@/components/shared/Spinner";
import { useAuth } from "@/features/auth/hooks/useAuth";

/** Solo accesible cuando NO hay sesión; redirige a /admin si está autenticado. */
export function GuestRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner label="Autenticando..." />;
  }

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}

/** Protege rutas privadas; guarda la ubicación de origen para volver tras el login. */
export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Spinner label="Autenticando..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}