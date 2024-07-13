interface IOtpVerifyDataApi {
    otp: string | undefined;
    newPassword?: string | undefined;
}

interface IOtpVerifyDataApiRes extends IBaseAPIRes {
    code?: number;
    message?: string;
    result?: IOtpVerifyDataApi;
}
