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

export const CLIENT = {
    LOGIN_PAGE: LOGIN,
    REGISTER_PAGE: REGISTER,
    FORGOTPASSWORD_PAGE: FORGOTPASSWORD,
    POSTFORGOTPASSWORD_PAGE: POSTFORGOTPASSWORD,
    CHANGEPASSWORD_PAGE: CHANGEPASSWORD,
    CHANGEPASSWORDSUCCESS_PAGE: CHANGEPASSWORDSUCCESS,
    HOME_PAGE: HOME,
};

const LOGIN_API: IRouteConstant = {
    href: '/user/login',
};

const REGISTER_API: IRouteConstant = {
    href: '/user/register',
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
    FORGOTPASSWORD: FORGOTPASSWORD_API,
    POSTFORGOTPASSWORD: POSTFORGOTPASSWORD_API,
    CHANGEPASSWORD: CHANGEPASSWORD_API,
    CHANGEPASSWORDSUCCESS: CHANGEPASSWORDSUCCESS_API,
};
