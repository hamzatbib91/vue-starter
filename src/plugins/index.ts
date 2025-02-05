import type { App } from 'vue';
import { initFluent } from './fluent';

/**
 * Initializes all plugins for the given Vue app instance.
 * 
 * @param app - The Vue app instance.
 */
export default (app: App<Element>) => {
  initFluent(app);
};
