interface IUploadImgDataAPI {
    images?: string;
}

interface IUploadImgDataAPIRes extends IBaseAPIRes {
    code?: number;
    result?: IUploadImgDataAPI;
}
