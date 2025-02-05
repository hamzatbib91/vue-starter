import { AuthRoutes } from "@/modules/auth/constants/auth-route-name";
import { DashboardRoutes } from "@/modules/dashboard/constants/dashboard-route-name";

/**
 * Object representing the names of different routes used in the application.
 * It includes route names for authentication and dashboard modules.
 */
export const RouteName = {
  AUTH: AuthRoutes,
  DASHBOARD: DashboardRoutes,
} as const;