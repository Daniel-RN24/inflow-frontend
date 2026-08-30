import { API_BASE_URL } from "@/config/env";
import { clearToken, getToken } from "@/lib/http/tokenStorage";

export class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * Cliente HTTP centralizado.
 *
 * - Inyecta el token de autenticación automáticamente.
 * - Serializa el cuerpo como JSON (excepto FormData).
 * - Normaliza los errores como `ApiError`.
 *
 * El backend responde con HTTP 200 incluso para errores de negocio
 * (`{ success: false, msg }`), por lo que este cliente NO lanza error con
 * `response.ok === false`; la validación de negocio queda en cada función
 * de la capa de features (`src/features/<feature>/api`).
 */
export async function apiRequest(
  path,
  { method = "GET", body, headers = {}, requiresAuth = true } = {},
) {
  const finalHeaders = { ...headers };

  if (body !== undefined && !(body instanceof FormData)) {
    finalHeaders["Content-Type"] = "application/json";
  }

  const token = getToken();
  if (requiresAuth && token) {
    finalHeaders.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: finalHeaders,
    body:
      body instanceof FormData
        ? body
        : body !== undefined
          ? JSON.stringify(body)
          : undefined,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 401) clearToken();
    throw new ApiError(
      payload?.msg ?? "Error de conexión con el servidor",
      response.status,
      payload,
    );
  }

  return payload;
}