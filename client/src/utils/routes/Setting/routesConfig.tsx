import { routes } from '..';
import { LoginPage, RegisterPage, Home, ForgotPasswordPage, PostForgotPasswordPage, ChangePasswordPage } from '../../../pages';

const routesConfig = [
  // ========================= AUTHENTICATION ==============================
  {
    path: routes.CLIENT.LOGIN_PAGE.href,
    element: <LoginPage />
  },
  {
    path: routes.CLIENT.REGISTER_PAGE.href,
    element: <RegisterPage />
  },
  {
    path: routes.CLIENT.FORGOTPASSWORD_PAGE.href,
    element: <ForgotPasswordPage />
  },
  {
    path: routes.CLIENT.POSTFORGOTPASSWORD_PAGE.href,
    element: <PostForgotPasswordPage />
  },
  {
    path: routes.CLIENT.CHANGEPASSWORD_PAGE.href,
    element: <ChangePasswordPage />
  },

  // ========================= PAGE =========================================
  {
    path: routes.CLIENT.HOME_PAGE.href,
    element: <Home />
  }
];

export default routesConfig;
