import { ApiError, apiRequest } from "@/lib/http/apiClient";

export async function getDashboardStats() {
  const data = await apiRequest("/dashboard");

  if (data.success === false) {
    throw new ApiError(data.msg ?? "No se pudieron obtener las estadísticas");
  }

  return data;
}