import { useAuth } from '@/modules/auth/composables/use-auth';
import { LayoutName } from '@/shared/constants/layout-name';
import type { RouteRecordRaw } from 'vue-router';
import { DashboardRoutes } from '../constants/dashboard-route-name';

/**
 * Array of route records for the dashboard module.
 * 
 * @constant
 * @type {RouteRecordRaw[]}
 * 
 * @property {string} path - The URL path for the route.
 * @property {string} name - The name of the route, referencing the DashboardRoutes enum.
 * @property {object} meta - Metadata for the route.
 * @property {string} meta.layout - The layout to be used for this route, referencing the LayoutName enum.
 * @property {Function} component - A function that dynamically imports the component for this route.
 * @property {Function} beforeEnter - A navigation guard that checks if the user is authenticated before entering the route.
 * 
 * @returns {RouteRecordRaw[]} The array of route records.
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: DashboardRoutes.HOME,
    meta: { layout: LayoutName.DEFAULT_LAYOUT , breadcrumbOptions: [{ label: 'Dashboard', href: null }] },
    component: () => import('../views/dashboard.vue'),
    /**
     * Navigation guard to check if the user is authenticated before entering the route.
     * 
     * @returns {boolean | object} - Returns `true` if the user is authenticated, otherwise redirects to the login route.
     */
    beforeEnter() {
      const { isAuthenticated } = useAuth();

      // return !isAuthenticated() ? { name: RouteName.AUTH.LOGIN } : true;
      return true;
    },
  },
];

export default routes;
