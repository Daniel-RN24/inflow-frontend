import { ApiError, apiRequest } from "@/lib/http/apiClient";

export async function listTransactions({ page = 1, limit = 10 } = {}) {
  const data = await apiRequest(
    `/transacciones?page=${page}&limit=${limit}`,
  );

  if (data.success === false) {
    throw new ApiError(data.msg ?? "No se pudieron obtener las transacciones");
  }

  return data;
}

export async function createTransaction(payload) {
  const data = await apiRequest("/transacciones", {
    method: "POST",
    body: payload,
  });

  if (data.success === false) {
    throw new ApiError(data.msg ?? "No se pudo crear la transacción");
  }

  return data;
}

export async function updateTransaction(id, payload) {
  const data = await apiRequest(`/transacciones/${id}`, {
    method: "PUT",
    body: payload,
  });

  if (data.success === false) {
    throw new ApiError(data.msg ?? "No se pudo actualizar la transacción");
  }

  return data;
}

export async function deleteTransaction(id) {
  const data = await apiRequest(`/transacciones/eliminar/${id}`, {
    method: "PUT",
  });

  if (data.success === false) {
    throw new ApiError(data.msg ?? "No se pudo eliminar la transacción");
  }

  return data;
}

export function listConcepts() {
  return apiRequest("/conceptos").then((data) => data.results ?? []);
}

export function listAccounts() {
  return apiRequest("/cuentas").then((data) => data.results ?? []);
}