interface ILoginDataAPI {
    email?: string;
    password?: string;
}

interface ILoginAPIRes extends IBaseAPIRes {
    access_token?: string;
    session_id?: string;
}
