
//============================== CLIENT ===========================

const HOME: IRouteConstant = {
    href: '/'
}

const LOGIN: IRouteConstant = {
    href: '/login' 
}

const REGISTER: IRouteConstant = {
    href: '/register'
}
export const CLIENT = {
    LOGIN_PAGE: LOGIN,
    REGISTER_PAGE: REGISTER,
    HOME_PAGE: HOME 
    
}

// ================================ API ==============================

const LOGIN_API: IRouteConstant = {
    href: '/api/login'
}

const REGISTER_API: IRouteConstant = {
    href: '/api/register'
}

export const API = { 
    LOGIN: LOGIN_API,
    REGISTER: REGISTER_API
}