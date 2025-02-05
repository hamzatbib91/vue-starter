import { LayoutName } from '@/shared/constants/layout-name';
import { RouteName } from '@/shared/constants/route-name';
import { createRouter, createWebHistory } from 'vue-router';
import { requiresAuthNavGuard } from './nav-guards/requires-auth';

/**
 * Creates a Vue Router instance with the specified routes and history mode.
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: RouteName.AUTH.LOGIN },
      meta: {
        layout: LayoutName.NO_LAYOUT,
      },
    },
  ],
});

/**
 * Adds a navigation guard to the router that requires authentication.
 */
router.beforeEach(requiresAuthNavGuard);

export default router;
