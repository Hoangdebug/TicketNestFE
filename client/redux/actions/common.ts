import Router from 'next/router';
import { SET_LOCALE, SET_MODAL } from '@redux/actions/type';

// Action set active locale
export const setLocale = (data: string = 'jp') => {
    Router.push(
        {
            pathname: Router.pathname,
            query: Router.query,
        },
        Router.asPath,
        { locale: data, scroll: false },
    );

    return {
        type: SET_LOCALE,
        data,
    };
};

export const setModal = (data: IModalReduxData = { isShow: false }) => {
    return {
        type: SET_MODAL,
        data,
    };
};
