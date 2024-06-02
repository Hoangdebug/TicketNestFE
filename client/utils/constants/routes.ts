const HOME: IRouteConstant = {
    href: '/',
};

const LOGIN: IRouteConstant = {
    href: '/login',
};

const REGISTER: IRouteConstant = {
    href: '/register',
};

const FORGOTPASSWORD: IRouteConstant = {
    href: '/forgotpassword/forgot_password',
};

const POSTFORGOTPASSWORD: IRouteConstant = {
    href: '/forgotpassword/',
};

const CHANGEPASSWORD: IRouteConstant = {
    href: '/changepassword',
};

const CHANGEPASSWORDSUCCESS: IRouteConstant = {
    href: '/changepasswordsuccess',
};

const REGISTERSUCCESS: IRouteConstant = {
    href: '/registersuccess',
};

const ERROR404: IRouteConstant = {
    href: '/404',
};

const ERROR500: IRouteConstant = {
    href: '/500',
};

const ERROR403: IRouteConstant = {
    href: '/403',
};

const ADMIN_DASHBOARD: IRouteConstant = {
    href: '/admin',
};
export const CLIENT = {
    LOGIN_PAGE: LOGIN,
    REGISTER_PAGE: REGISTER,
    FORGOTPASSWORD_PAGE: FORGOTPASSWORD,
    POSTFORGOTPASSWORD_PAGE: POSTFORGOTPASSWORD,
    CHANGEPASSWORD_PAGE: CHANGEPASSWORD,
    CHANGEPASSWORDSUCCESS_PAGE: CHANGEPASSWORDSUCCESS,
    REGISTERSUCCESS_PAGE: REGISTERSUCCESS,
    ERROR404_PAGE: ERROR404,
    ERROR500_PAGE: ERROR500,
    ERROR403_PAGE: ERROR403,
    HOME_PAGE: HOME,
    ADMIN_PAGE: ADMIN_DASHBOARD,
};

const LOGIN_API: IRouteConstant = {
    href: '/user/login',
};

const REGISTER_API: IRouteConstant = {
    href: '/user/register',
};

const CURRENT_USER_API: IRouteConstant = {
    href: '/user/current',
};
const FORGOTPASSWORD_API: IRouteConstant = {
    href: '/user/forgotpassword',
};

const POSTFORGOTPASSWORD_API: IRouteConstant = {
    href: '/user/postforgotpassword',
};

const CHANGEPASSWORD_API: IRouteConstant = {
    href: '/user/changepassword',
};

const CHANGEPASSWORDSUCCESS_API: IRouteConstant = {
    href: '/user/changepasswordsuccess',
};

export const API = {
    LOGIN: LOGIN_API,
    REGISTER: REGISTER_API,
    CURRENT_USER: CURRENT_USER_API,
    FORGOTPASSWORD: FORGOTPASSWORD_API,
    POSTFORGOTPASSWORD: POSTFORGOTPASSWORD_API,
    CHANGEPASSWORD: CHANGEPASSWORD_API,
    CHANGEPASSWORDSUCCESS: CHANGEPASSWORDSUCCESS_API,
};
