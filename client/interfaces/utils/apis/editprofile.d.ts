interface IEditUserProfileDataAPI {
    firstName?: string;
    lastName?: string;
    dob?: string;
    gender?: string;
    phone?: string;
    address?: string;
}

interface IEditUserProfileAPIRes extends IBaseAPIRes {
    code: number;
    mes: string;
    data?: {
        userData: {
            firstName: string;
            lastName: string;
            dob: string;
            gender: string;
            phone: string;
            address: string;
        };
    };
}
