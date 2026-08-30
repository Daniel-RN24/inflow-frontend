import { getDashboardStats } from "@/features/dashboard/api/dashboardApi";
import { useAsync } from "@/lib/hooks/useAsync";

export function useDashboardData() {
  return useAsync(getDashboardStats);
}