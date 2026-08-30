import { ApiError, apiRequest } from "@/lib/http/apiClient";

async function list(path) {
  const data = await apiRequest(path);

  if (data.success === false) {
    throw new ApiError(data.msg ?? "No se pudieron cargar los datos");
  }

  return data.results ?? [];
}

export const listCategories = () => list("/categorias");
export const listConceptos = () => list("/conceptos");
export const listAccounts = () => list("/cuentas");