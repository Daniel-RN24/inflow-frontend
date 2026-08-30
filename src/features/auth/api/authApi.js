import { ApiError, apiRequest } from "@/lib/http/apiClient";

export async function login(credentials) {
  const data = await apiRequest("/auth/autenticar", {
    method: "POST",
    body: credentials,
    requiresAuth: false,
  });

  if (!data.token) {
    throw new ApiError(data.msg ?? "Credenciales incorrectas");
  }

  return data;
}

export function getProfile() {
  return apiRequest("/auth/perfil");
}

export function register(userData) {
  return apiRequest("/usuarios", {
    method: "POST",
    body: userData,
    requiresAuth: false,
  });
}

export function forgotPassword(email) {
  return apiRequest("/auth/olvide-password", {
    method: "POST",
    body: { email },
    requiresAuth: false,
  });
}

export function checkResetToken(token) {
  return apiRequest(`/auth/olvide-password/${token}`, {
    method: "GET",
    requiresAuth: false,
  });
}

export function resetPassword(token, password) {
  return apiRequest(`/auth/olvide-password/${token}`, {
    method: "POST",
    body: { password },
    requiresAuth: false,
  });
}

export function confirmAccount(token) {
  return apiRequest(`/auth/confirmar/${token}`, {
    method: "GET",
    requiresAuth: false,
  });
}

export function updateProfile(data) {
  return apiRequest(`/usuarios/editar/${data.id}`, {
    method: "PUT",
    body: data,
  });
}

export async function updatePassword(data) {
  return apiRequest("/usuario/actualizar-password", {
    method: "PUT",
    body: data,
  });
}