interface ILoginDataAPI {
    email?: string;
    password?: string;
}

interface ILoginAPIRes extends IBaseAPIRes {
    accessToken?: string;
    session_id?: string;
    userData: {
        type?: string;
    };
}
