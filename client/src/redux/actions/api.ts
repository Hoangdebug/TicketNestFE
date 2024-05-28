import { Dispatch } from 'redux';
import { REGISTER_FAILURE, REGISTER_SUCCESS, SET_LOADER } from './type';
import { AxiosError, AxiosResponse } from 'axios';
import { apiHelper } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes';

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
            // const res = await apiHelper.login(data);
            // authHelper.setAccessToken(res.data.access_token ?? '');
            // if (callBack) {
            //     callBack(res?.data);
            // }
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
    isLoad: boolean = true
  ) => async (dispatch: Dispatch) => {
    if (isLoad) {
      dispatch(setLoader(true));
    }
  
    try {
      console.log("HEHE__: ", data);
      const res = await apiHelper.register(data);
      // dispatch({ type: REGISTER_SUCCESS, payload: res?.data });
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
    } finally {
      if (isLoad) {
        dispatch(setLoader(false));
      }
    }
  };
