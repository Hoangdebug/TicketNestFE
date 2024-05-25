import { routes } from ".."
import { LoginPage, RegisterPage, Home} from "../../../pages"

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

    // ========================= PAGE =========================================
    {
        path: routes.CLIENT.HOME_PAGE.href,
        element: <Home />
    }
]

export default routesConfig
