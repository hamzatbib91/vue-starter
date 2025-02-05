import { initAuthModule } from "./auth";
import { initDashBoardModule } from "./dashboard";

/**
 * Initializes the dashboard and authentication modules with the provided options.
 *
 * @param {IModuleOptions} opts - The options to initialize the modules with.
 */
export default (opts: IModuleOptions) => {
  initAuthModule(opts);
  initDashBoardModule(opts);
};
