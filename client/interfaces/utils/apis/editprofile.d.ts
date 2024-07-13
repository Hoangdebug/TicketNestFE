interface IEditUserProfileDataAPI {
    _id?: string;
    username?: string;
    email?: string;
    dob?: string;
    gender?: string;
    phone?: string;
    address?: string;
    images?: string | FormData;
    isBlocked?: boolean;
    type?: string;
    role?: string;
    organizerRequest?: string;
}

interface IEditUserProfileAPIRes extends IBaseAPIRes {
    code: number;
    mes: string;
    data?: {
        userData: IEditUserProfileDataAPI;
    };
}

interface IAdminCustomerListAPIRes extends IBaseAPIRes {
    code: number;
    result?: IEditUserProfileDataAPI[];
}

interface IAdminUpdateOrganizerAPIRes extends IBaseAPIRes {
    code: number;
    result?: IEditUserProfileDataAPI;
}

interface IAdminCustomerBanAPIRes extends IBaseAPIRes {
    code: number;
    mes: string;
}
