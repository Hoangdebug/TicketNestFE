interface IRequestOrganizeDataAPI {
    description?: string;
    name?: string;
    Images?: string;
}

interface IRequestOrganizeAPIRes extends IBaseAPIRes {
    code: number;
    mes: string;
}
