interface IEditUserProfileDataAPI {
    _id?: string;
    username?: string;
    dob?: string;
    gender?: string;
    phone?: string;
    address?: string;
    images?: string;
    isBlocked?: boolean;
    type?: string;
    role?: string;
    organizerName?: string;
    organizerDescription?: string;
    mailOrganizerName?: string;
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

interface IAdminCustomerBanAPIRes extends IBaseAPIRes {
    code: number;
    mes: string;
}
