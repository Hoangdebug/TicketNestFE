
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
const REGISTERSUCCESS: IRouteConstant = {
    href: '/registersuccess'
}
const FIRSTERROR: IRouteConstant = {
    href: '/404'
}
const SECONDERROR: IRouteConstant = {
    href: '/500'
}
const THIRDERROR: IRouteConstant = {
    href: '/403'
}

export const CLIENT = {
    LOGIN_PAGE: LOGIN,
    REGISTER_PAGE: REGISTER,
    REGISTERSUCCESS_PAGE: REGISTERSUCCESS,
    FIRSTERROR_PAGE: FIRSTERROR,
    SECONDERROR_PAGE: SECONDERROR,
    THIRDERROR_PAGE: THIRDERROR,
    HOME_PAGE: HOME

}

// ================================ API ==============================

const LOGIN_API: IRouteConstant = {
    href: '/user/login'
}

const REGISTER_API: IRouteConstant = {
    href: '/user/register'
}
const REGISTERSUCCESS_API: IRouteConstant = {
    href: '/user/registersuccess'
}
const FIRSTERROR_API: IRouteConstant = {
    href: '/user/firsterror'
}
const SECONDERROR_API: IRouteConstant = {
    href: '/user/seconderror'
}
const THIRDERROR_API: IRouteConstant = {
    href: '/user/thirderror'
}
export const API = {
    LOGIN: LOGIN_API,
    REGISTER: REGISTER_API,
    REGISTERSUCCESS: REGISTERSUCCESS_API,
    FIRSTERROR: FIRSTERROR_API,
    SECONDERROR: SECONDERROR_API,
    THIRDERROR: THIRDERROR_API,
}