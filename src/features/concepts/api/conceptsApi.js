import { ApiError, apiRequest } from "@/lib/http/apiClient";

export const listConcepts = async ({page = 1, limit = 10}) => {
  const conceptos = await apiRequest(`/conceptos?page=${page}&limit=${limit}`);

  if (!conceptos.data) {
    throw new ApiError("No se pudieron obtener las transacciones");
  }

  return conceptos;
};

export const filterConcepts = async (filters, page = 1, limit = 10) => {
  const params = new URLSearchParams({ page, limit });
  if (filters.search) params.set("search", filters.search);
  if (filters.category) params.set("type", filters.category);

  const conceptos = await apiRequest(`/conceptos?${params.toString()}`);

  if (!conceptos.data) {
    throw new ApiError("No se pudieron obtener los conceptos");
  }

  return conceptos;
};

export const createConcept = async ({ payload }) => {
  const data = await apiRequest("/conceptos", {
    method: "POST",
    body: payload,
  });

  if (!data.success) {
    throw new ApiError(data.message ?? "No se pudo crear el concepto indicado");
  }

  return data;
};

export const updateConcept = async (id, payload) => {
  const data = await apiRequest(`/conceptos/${id}`, {
    method: "PUT",
    body: payload,
  });

  if (!data.success) {
    throw new ApiError(
      data.message ?? "No se pudo actualizar el concepto indicado",
    );
  }

  return data;
};

export const deleteConcept = async (id) => {
  const data = await apiRequest(`/conceptos/${id}`, { method: "DELETE" });

  if (!data.success) {
    throw new ApiError(
      data.message ?? "No se pudo eliminar el concepto indicado",
    );
  }

  return data;
};
