const HOME: IRouteConstant = {
    href: '/',
};

const LOGIN: IRouteConstant = {
    href: '/login',
};

const REGISTER: IRouteConstant = {
    href: '/register',
};

const FORGOT_PASSWORD: IRouteConstant = {
    href: '/forgotpassword/forgot_password',
};

const POST_FORGOT_PASSWORD: IRouteConstant = {
    href: '/forgotpassword/post_forgot_password',
};

const CHANGE_PASSWORD: IRouteConstant = {
    href: '/forgotpassword/change_password',
};

const CHANGE_PASSWORD_SUCCESS: IRouteConstant = {
    href: '/forgotpassword/change_password_success',
};

const ADMIN_DASHBOARD: IRouteConstant = {
    href: '/admin',
};
export const CLIENT = {
    LOGIN_PAGE: LOGIN,
    REGISTER_PAGE: REGISTER,
    FORGOT_PASSWORD_PAGE: FORGOT_PASSWORD,
    POST_FORGOT_PASSWORD_PAGE: POST_FORGOT_PASSWORD,
    CHANGE_PASSWORD_PAGE: CHANGE_PASSWORD,
    CHANGE_PASSWORD_SUCCESS_PAGE: CHANGE_PASSWORD_SUCCESS,
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
