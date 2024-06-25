import { Dispatch } from 'redux';
import { AxiosError, AxiosResponse } from 'axios';
import { authHelper, apiHelper } from '@utils/helpers';
import { SET_LOADER, SET_MEMBER_PROFILE } from '@redux/actions/type';

const setLoader = (data: boolean = false) => {
    return {
        type: SET_LOADER,
        data,
    };
};

export const fetchLogin = async (
    data: ILoginDataAPI,
    callBack?: (result: ILoginAPIRes | IErrorAPIRes | null) => void,
    isLoad: boolean = true,
) => {
    return async (dispatch: Dispatch) => {
        if (isLoad) {
            dispatch(setLoader(true));
        }

        try {
            const res = await apiHelper.login(data);
            authHelper.setAccessToken(res.data.accessToken ?? '');
            if (callBack) {
                callBack(res?.data);
            }
        } catch (err) {
            if (!(err instanceof Error)) {
                const res = err as AxiosResponse<IErrorAPIRes, AxiosError>;
                if (callBack) {
                    callBack(res?.data);
                }
            }
        }

        if (isLoad) {
            dispatch(setLoader(false));
        }
    };
};
export const fetchRegister = (
    data: IRegisterDataApi,
    callBack?: (result: IRegisterDataApiRes | IErrorAPIRes | null) => void,
    isLoad: boolean = true,
) => {
    return async (dispatch: Dispatch) => {
        if (isLoad) {
            dispatch(setLoader(true));
        }

        try {
            const res = await apiHelper.register(data);
            if (callBack) {
                callBack(res?.data);
            }
        } catch (err) {
            if (!(err instanceof Error)) {
                const res = err as AxiosResponse<IErrorAPIRes, AxiosError>;
                if (callBack) {
                    callBack(res?.data);
                }
            }
        }

        if (isLoad) {
            dispatch(setLoader(false));
        }
    };
};

export const fetchGetCurrentAccount = async (callBack?: (result: ICurrentUserAPIRes | IErrorAPIRes | null) => void) => {
    try {
        const res = await apiHelper.getCurrentUser();

        return {
            type: SET_MEMBER_PROFILE,
            data: { details: res?.data?.result },
        };
    } catch (err) {
        if (!(err instanceof Error)) {
            const res = err as AxiosResponse<IErrorAPIRes, AxiosError>;
            if (callBack) {
                callBack(res?.data);
            }
        }
    }
};

export const fetchLogout = () => {
    authHelper.logOut();
    return {
        type: SET_MEMBER_PROFILE,
        data: { profile: null },
    };
};

export const fetchEditUserProfile = async (
    data: IEditUserProfileDataAPI,
    callBack?: (result: IEditUserProfileAPIRes | IErrorAPIRes | null) => void,
    isLoad: boolean = true,
) => {
    return async (dispatch: Dispatch) => {
        if (isLoad) {
            dispatch(setLoader(true));
        }

        try {
            const res = await apiHelper.editUserProfile(data);
            if (callBack) {
                callBack(res?.data);
            }
        } catch (err) {
            if (!(err instanceof Error)) {
                const res = err as AxiosResponse<IErrorAPIRes, AxiosError>;
                if (callBack) {
                    callBack(res?.data);
                }
            }
        }

        if (isLoad) {
            dispatch(setLoader(false));
        }
    };
};

