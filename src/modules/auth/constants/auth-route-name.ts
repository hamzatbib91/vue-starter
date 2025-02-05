/**
 * An object containing route names for authentication-related pages.
 * 
 * @property {string} LOGIN - The route name for the login page.
 * @property {string} REGISTER - The route name for the registration page.
 * @property {string} FORGOT_PASSWORD - The route name for the forgot password page.
 * @property {string} RESET_PASSWORD - The route name for the reset password page.
 */
export const AuthRoutes = {
    LOGIN: 'Login Page',
    REGISTER: 'Register Page',
    FORGOT_PASSWORD: 'Forgot Password Page',
    RESET_PASSWORD: 'Reset Password Page',
  } as const;
  