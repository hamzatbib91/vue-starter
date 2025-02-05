import type { App } from 'vue';
import { LayoutName } from '@/shared/constants/layout-name';

import NoLayout from './no-layout.vue';
import DefaultLayout from './default-layout.vue';

import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    layout?: LayoutName;
  }
}

/**
 * Registers layout components globally in the Vue application.
 * 
 * @param app - The Vue app instance.
 */
export default (app: App<Element>) => {
  app.component(LayoutName.NO_LAYOUT, NoLayout);
  app.component(LayoutName.DEFAULT_LAYOUT, DefaultLayout);
};