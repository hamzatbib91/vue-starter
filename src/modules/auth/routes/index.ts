import { LayoutName } from '@/shared/constants/layout-name';
import { RouteName } from '@/shared/constants/route-name';
import type { RouteRecordRaw } from 'vue-router';
import { useAuth } from '../composables/use-auth';
import { AuthRoutes } from '../constants/auth-route-name';

/**
 * Defines the routes for the authentication module.
 * 
 * @constant
 * @type {RouteRecordRaw[]}
 * 
 * @property {string} path - The URL path for the route.
 * @property {string} name - The name of the route, referencing an enum value from AuthRoutes.
 * @property {object} meta - Metadata for the route, including the layout to be used.
 * @property {function} component - A function that dynamically imports the component for the route.
 * @property {function} beforeEnter - A navigation guard that checks if the user is authenticated before entering the route.
 * 
 * @returns {RouteRecordRaw[]} An array of route records for the authentication module.
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: AuthRoutes.LOGIN,
    meta: { layout: LayoutName.NO_LAYOUT},
    component: () => import('../views/login-page.vue'),
    /**
     * Navigation guard to check if the user is authenticated before entering the route.
     * 
     * @returns {boolean | object} - Returns `true` if the user is authenticated, otherwise redirects to the login route.
     */
    beforeEnter() {
      const { isAuthenticated } = useAuth();

      return isAuthenticated() ? { name: RouteName.DASHBOARD.HOME } : true;
    },
  },
  {
    path: '/register',  
    name: AuthRoutes.REGISTER,
    meta: { layout: LayoutName.NO_LAYOUT},
    component: () => import('../views/register-page.vue'),
    /**
     * Navigation guard to check if the user is authenticated before entering the route.
     * 
     * @returns {boolean | object} - Returns `true` if the user is authenticated, otherwise redirects to the login route.
     */
    beforeEnter() {
      const { isAuthenticated } = useAuth();

      return isAuthenticated() ? { name: RouteName.DASHBOARD.HOME } : true;
    },
  },
  {
    path: '/forgot-password',  
    name: AuthRoutes.FORGOT_PASSWORD,
    meta: { layout: LayoutName.NO_LAYOUT},
    component: () => import('../views/forgot-password-page.vue'),
    /**
     * Navigation guard to check if the user is authenticated before entering the route.
     * 
     * @returns {boolean | object} - Returns `true` if the user is authenticated, otherwise redirects to the login route.
     */
    beforeEnter() {
      const { isAuthenticated } = useAuth();

      return isAuthenticated() ? { name: RouteName.DASHBOARD.HOME } : true;
    },
  },
];

export default routes;
