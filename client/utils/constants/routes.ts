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

const REGISTERSUCCESS: IRouteConstant = {
    href: '/registersuccess',
};

const EVENT_DETAILS_PAGES: IRouteConstant = {
    href: '/event/detail/[id]',
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

const ADD_EVENT: IRouteConstant = {
    href: '/organizer/event/addevent',
};
const UPDATE_EVENT: IRouteConstant = {
    href: '/organizer/event/[id]',
};

const ORGANIZER_LIST_EVENT_PAGE: IRouteConstant = {
    href: '/organizer',
};

const ADMIN_DASHBOARD: IRouteConstant = {
    href: '/admin',
};
const ABOUT_US: IRouteConstant = {
    href: '/about',
};

const EDITPROFILE: IRouteConstant = {
    href: '/editprofile',
};

const REQUESTORGANIZE: IRouteConstant = {
    href: '/requestorganize',
};
const CONTACT: IRouteConstant = {
    href: '/contact',
};

export const CLIENT = {
    LOGIN_PAGE: LOGIN,
    REGISTER_PAGE: REGISTER,
    REGISTERSUCCESS_PAGE: REGISTERSUCCESS,
    ERROR404_PAGE: ERROR404,
    ERROR500_PAGE: ERROR500,
    ERROR403_PAGE: ERROR403,
    FORGOT_PASSWORD_PAGE: FORGOT_PASSWORD,
    POST_FORGOT_PASSWORD_PAGE: POST_FORGOT_PASSWORD,
    CHANGE_PASSWORD_PAGE: CHANGE_PASSWORD,
    CHANGE_PASSWORD_SUCCESS_PAGE: CHANGE_PASSWORD_SUCCESS,
    ADD_EVENT_PAGE: ADD_EVENT,
    HOME_PAGE: HOME,
    ADMIN_PAGE: ADMIN_DASHBOARD,
    EDIT_PROFILE_PAGE: EDITPROFILE,
    REQUEST_ORGNIZE_PAGE: REQUESTORGANIZE,
    EVENT_DETAILS: EVENT_DETAILS_PAGES,
    ORGANIZER_LIST_EVENT: ORGANIZER_LIST_EVENT_PAGE,
    UPDATE_EVENT_PAGE: UPDATE_EVENT,
    ABOUT_PAGE: ABOUT_US,
    CONTACT_PAGE: CONTACT,
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

const ADD_EVENT_API: IRouteConstant = {
    href: '/',
};
export const API = {
    LOGIN: LOGIN_API,
    REGISTER: REGISTER_API,
    CURRENT_USER: CURRENT_USER_API,
    FORGOTPASSWORD: FORGOTPASSWORD_API,
    POSTFORGOTPASSWORD: POSTFORGOTPASSWORD_API,
    CHANGEPASSWORD: CHANGEPASSWORD_API,

    // organizer
    ADD_EVENT: ADD_EVENT_API,
};
