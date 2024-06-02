import { routes } from ".."
import { LoginPage, RegisterPage, RegisterSuccessPage, FirstErrorPage, SecondErrorPage, ThirdErrorPage, Home } from "../../../pages"

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
        path: routes.CLIENT.REGISTERSUCCESS_PAGE.href,
        element: <RegisterSuccessPage />
    },
    {
        path: routes.CLIENT.FIRSTERROR_PAGE.href,
        element: <FirstErrorPage />
    },
    {
        path: routes.CLIENT.SECONDERROR_PAGE.href,
        element: <SecondErrorPage />
    },
    {
        path: routes.CLIENT.THIRDERROR_PAGE.href,
        element: <ThirdErrorPage />
    },
    // ========================= PAGE =========================================
    {
        path: routes.CLIENT.HOME_PAGE.href,
        element: <Home />
    }
]

export default routesConfig
