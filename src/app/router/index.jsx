import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Spinner from "@/components/shared/Spinner";
import { GuestRoute, ProtectedRoute } from "@/app/router/guards";
import AuthLayout from "@/components/layout/AuthLayout";
import PrivateLayout from "@/components/layout/PrivateLayout";
import { TransactionsUiProvider } from "@/features/transactions/context/TransactionsUiProvider";

const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/features/auth/pages/RegisterPage"));
const ForgotPasswordPage = lazy(() =>
  import("@/features/auth/pages/ForgotPasswordPage"),
);
const ResetPasswordPage = lazy(() =>
  import("@/features/auth/pages/ResetPasswordPage"),
);
const ConfirmAccountPage = lazy(() =>
  import("@/features/auth/pages/ConfirmAccountPage"),
);
const ProfilePage = lazy(() => import("@/features/auth/pages/ProfilePage"));

const DashboardPage = lazy(() =>
  import("@/features/dashboard/pages/DashboardPage"),
);
const TransactionsPage = lazy(() =>
  import("@/features/transactions/pages/TransactionsPage"),
);
const ConceptsPage = lazy(() => import("@/features/meta/pages/ConceptsPage"));
const CategoriesPage = lazy(() =>
  import("@/features/meta/pages/CategoriesPage"),
);
const AccountsPage = lazy(() => import("@/features/meta/pages/AccountsPage"));

export default function AppRouter() {
  return (
    <Suspense fallback={<Spinner label="Cargando..." />}>
      <Routes>
        {/* Rutas públicas (solo sin sesión) */}
        <Route element={<GuestRoute />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<AuthLayout />}>
            <Route index element={<LoginPage />} />
            <Route path="registrarse" element={<RegisterPage />} />
            <Route path="olvide-password" element={<ForgotPasswordPage />} />
            <Route
              path="change-password/:token"
              element={<ResetPasswordPage />}
            />
            <Route path="confirmar/:token" element={<ConfirmAccountPage />} />
          </Route>
        </Route>

        {/* Rutas privadas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<PrivateLayout />}>
            <Route index element={<DashboardPage />} />
            <Route
              path="transacciones"
              element={
                <TransactionsUiProvider>
                  <TransactionsPage />
                </TransactionsUiProvider>
              }
            />
            <Route path="conceptos" element={<ConceptsPage />} />
            <Route path="categorias" element={<CategoriesPage />} />
            <Route path="cuentas" element={<AccountsPage />} />
            <Route path="perfil" element={<ProfilePage />} />
          </Route>
        </Route>

        {/* Cualquier otra ruta → login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
}