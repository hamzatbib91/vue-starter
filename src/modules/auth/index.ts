import routes from './routes';

/**
 * Initializes the authentication module by adding routes to the router.
 *
 * @param {Object} context - The context object.
 * @param {VueRouter} context.router - The Vue router instance.
 */
export const initAuthModule: IModuleFn = ({ router }) => {
  routes.map((route) => router.addRoute(route));
};
