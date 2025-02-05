import routes from './routes';

/**
 * Initializes the dashboard module by adding routes to the router.
 *
 * @param {Object} param - The parameter object.
 * @param {Router} param.router - The router instance to which the routes will be added.
 */
export const initDashBoardModule: IModuleFn = ({ router }) => {
  routes.map((route) => router.addRoute(route));
};
