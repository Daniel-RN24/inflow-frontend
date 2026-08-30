import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext, AUTH_STATUS } from "@/features/auth/context/authContext";
import * as authApi from "@/features/auth/api/authApi";
import { clearToken, getToken, setToken } from "@/lib/http/tokenStorage";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(AUTH_STATUS.LOADING);

  // Restaura la sesión al montar la aplicación (valida el token).
  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      if (!getToken()) {
        setStatus(AUTH_STATUS.GUEST);
        return;
      }

      try {
        const profile = await authApi.getProfile();
        if (cancelled) return;
        setUser(profile);
        setStatus(AUTH_STATUS.AUTHENTICATED);
      } catch {
        if (cancelled) return;
        clearToken();
        setUser(null);
        setStatus(AUTH_STATUS.GUEST);
      }
    };

    bootstrap();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (credentials) => {
    const session = await authApi.login(credentials);
    setToken(session.token);
    setUser(session);
    setStatus(AUTH_STATUS.AUTHENTICATED);
    return session;
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    setStatus(AUTH_STATUS.GUEST);
  }, []);

  const updateProfile = useCallback(async (data) => {
    await authApi.updateProfile(data);
    setUser((prev) => ({ ...prev, ...data }));
    return { msg: "Almacenado correctamente" };
  }, []);

  const updatePassword = useCallback((data) => {
    return authApi.updatePassword(data);
  }, []);

  const value = useMemo(
    () => ({
      user,
      status,
      isLoading: status === AUTH_STATUS.LOADING,
      isAuthenticated: status === AUTH_STATUS.AUTHENTICATED,
      login,
      logout,
      updateProfile,
      updatePassword,
    }),
    [user, status, login, logout, updateProfile, updatePassword],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}