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

const setAccount = (data: IEditUserProfileDataAPI | null) => {
    return {
        type: SET_MEMBER_PROFILE,
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
    return async (dispatch: Dispatch) => {
        try {
            const res = await apiHelper.getCurrentUser();

            dispatch(setAccount(res?.data?.result ?? null));
        } catch (err) {
            if (!(err instanceof Error)) {
                const res = err as AxiosResponse<IErrorAPIRes, AxiosError>;
                if (callBack) {
                    callBack(res?.data);
                }
            }
        }
    };
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

export const fetchRequestOrganizer = async (
    data: IEditUserProfileDataAPI,
    callBack?: (result: IEditUserProfileAPIRes | IErrorAPIRes | null) => void,
    isLoad: boolean = true,
) => {
    return async (dispatch: Dispatch) => {
        if (isLoad) {
            dispatch(setLoader(true));
        }

        try {
            const res = await apiHelper.requestOrganizer(data);
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

export const fetchAddEvent = async (
    data: IEventDataApi,
    callBack?: (result: IEventDataApiRes | IErrorAPIRes | null) => void,
    isLoad: boolean = true,
) => {
    return async (dispatch: Dispatch) => {
        if (isLoad) {
            dispatch(setLoader(true));
        }

        try {
            const res = await apiHelper.addEvent(data);
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
export const fetchListEvent = async (callBack?: (result: IEventDataApiListRes | IErrorAPIRes | null) => void, isLoad: boolean = true) => {
    return async (dispatch: Dispatch) => {
        if (isLoad) {
            dispatch(setLoader(true));
        }

        try {
            const res = await apiHelper.listEvent();
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
export const fetchDetailsEvent = async (
    id: string,
    callBack?: (result: IEventDataApiRes | IErrorAPIRes | null) => void,
    isLoad: boolean = true,
) => {
    return async (dispatch: Dispatch) => {
        if (isLoad) {
            dispatch(setLoader(true));
        }

        try {
            const res = await apiHelper.detailsEvent(id);
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
