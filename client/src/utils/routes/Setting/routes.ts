
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

const FORGOTPASSWORD: IRouteConstant = {
    href: '/forgotpassword' 
}

export const CLIENT = {
    LOGIN_PAGE: LOGIN,
    REGISTER_PAGE: REGISTER,
    FORGOTPASSWORD_PAGE: FORGOTPASSWORD,
    HOME_PAGE: HOME 
    
}

// ================================ API ==============================

const LOGIN_API: IRouteConstant = {
    href: '/user/login'
}

const REGISTER_API: IRouteConstant = {
    href: '/user/register'
}

const FORGOTPASSWORD_API: IRouteConstant = {
    href: '/user/forgotpassword'
}

export const API = { 
    LOGIN: LOGIN_API,
    REGISTER: REGISTER_API,
    FORGOTPASSWORD: FORGOTPASSWORD_API
}