interface IRequestOrganizeDataAPI {
    description?: string;
    name?: string;
    contact_email?: string;
    contact_phone?: string;
}

interface IRequestOrganizeAPIRes extends IBaseAPIRes {
    code: number;
    mes: string;
}

interface IAdminRequestCustomerAcceptApiRes extends IBaseAPIRes {
    code: number;
    results: IRequestOrganizeDataAPI;
}
