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

export async function filterTransactions(page = 1, limit = 10, filters) {
  const params = new URLSearchParams({page, limit})
  if (filters.busqueda) params.set("search", filters.busqueda);
  if (filters.tipo && filters.tipo !== "todos") params.set("type", filters.tipo);
  if (filters.categoria) params.set("category", filters.categoria);
  if (filters.fechaDesde) params.set("fromDate", filters.fechaDesde);
  if (filters.fechaHasta) params.set("untilDate", filters.fechaHasta)
  const data = await apiRequest(
    `/transacciones?${params.toString()}`
  )

  if (data.success === false){
    throw new ApiError(data.msg ?? "No se pudieron obtener las transacciones")
  }

  return data
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

export async function listConcepts() {
  const data = await apiRequest("/conceptos");
  return data.results ?? [];
}

export async function listAccounts() {
  const data = await apiRequest("/cuentas");
  return data.results ?? [];
}

export async function listCategories(){
  const data = await apiRequest("/categorias");
  return data.results ?? [];
}