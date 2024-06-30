interface IEditUserProfileDataAPI {
    username?: string;
    dob?: string;
    gender?: string;
    phone?: string;
    address?: string;
    images?: string;
    type?: string;
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
