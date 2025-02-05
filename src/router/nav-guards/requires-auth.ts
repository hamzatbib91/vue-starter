import { useAuth } from '@/modules/auth/composables/use-auth';
import { RouteName } from '@/shared/constants/route-name';
import type { NavigationGuard } from 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;
  }
}

/**
 * Navigation guard that checks if the route requires authentication.
 * If the user is not authenticated, it redirects to the login page.
 * 
 * @param to - The target route object being navigated to.
 * @returns `true` if the user is authenticated or the route does not require authentication,
 *          otherwise redirects to the login page.
 */
export const requiresAuthNavGuard: NavigationGuard = (to) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated()) {
      return true;
    } else {
      return { name: RouteName.AUTH.LOGIN };
    }
  }
  return true;
};
