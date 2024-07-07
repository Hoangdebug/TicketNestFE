import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Loader from '@components/layouts/Loader';
import Modal from '@components/layouts/Modal';
import Header from '@components/layouts/Header';
import Footer from '@components/layouts/Footer';

import { useDispatch } from 'react-redux';
import { setLocale, setModal } from '@redux/actions';
import { http, routes } from '@utils/constants';

const App: IAppComponent<IAppComponentProps> = (props) => {
    const { children, statusCode } = props;
    const router = useRouter();
    const dispatch = useDispatch();
    const [state, setState] = useState<IAppComponentState>({
        reloadKey: 0,
        historyPathname: router.pathname,
    });
    const { reloadKey } = state;
    const { locale, pathname } = router;

    const noAuthPath = [
        // bắt phân quyền admin
        routes.CLIENT.CHANGE_PASSWORD_SUCCESS_PAGE.href,
    ];
    const isNotFoundPage = statusCode === http.NOT_FOUND_CODE;

    const isShowComponent = !noAuthPath.includes(pathname) && !isNotFoundPage;

    useEffect(() => {
        window.addEventListener('popstate', onBackButtonEvent);

        return () => {
            window.removeEventListener('popstate', onBackButtonEvent);
        };
    }, []);
    const noHeaderFooterPath = [
        routes.CLIENT.CHANGE_PASSWORD_PAGE.href,
        routes.CLIENT.CHANGE_PASSWORD_SUCCESS_PAGE.href,
        routes.CLIENT.FORGOT_PASSWORD_PAGE.href,
        routes.CLIENT.REGISTERSUCCESS_PAGE.href,
        routes.CLIENT.ERROR403_PAGE.href,
        routes.CLIENT.ERROR404_PAGE.href,
        routes.CLIENT.ERROR500_PAGE.href,
        routes.CLIENT.LOGIN_PAGE.href,
        routes.CLIENT.REGISTER_PAGE.href,
        routes.CLIENT.FORGOT_PASSWORD_PAGE.href,
        routes.CLIENT.POST_FORGOT_PASSWORD_PAGE.href,
        routes.CLIENT.CHANGE_PASSWORD_PAGE.href,
        routes.CLIENT.ADD_EVENT_PAGE.href,
        routes.CLIENT.ORGANIZER_LIST_EVENT.href,
        routes.CLIENT.CHANGE_PASSWORD_SUCCESS_PAGE.href,
        routes.CLIENT.ADMIN_PAGE.href,
        routes.CLIENT.UPDATE_EVENT_PAGE.href,
        routes.CLIENT.ADMIN_LIST_CUSTOMER_PAGE.href,
        routes.CLIENT.ADMIN_LIST_CUSTOMER_BAN_PAGE.href,
        routes.CLIENT.ADMIN_LIST_CUSTOMER_REQUEST_PAGE.href,
        routes.CLIENT.ADMIN_MANAGER_EVENT_PAGE.href,
        routes.CLIENT.ADMIN_CREATE_ACCOUNT_PAGE.href,
    ];
    useEffect(() => {
        handleScrollToTop();
        setState((prevState) => ({
            ...prevState,
            historyPathname: pathname,
        }));
    }, [pathname]);

    useEffect(() => {
        dispatch(setLocale(locale));
    }, [locale]);

    const onBackButtonEvent = () => {
        dispatch(setModal({ isShow: false }));
        handleScrollToTop();
    };

    const handleScrollToTop = () => {
        document.documentElement.style.scrollBehavior = 'auto';
        setTimeout(() => window.scrollTo(0, 0), 5);
    };

    return (
        <div key={reloadKey} className="components__app">
            <Loader />
            <Modal />
            <Header isShow={isShowComponent && !noHeaderFooterPath.includes(router.pathname)} />
            {children}
            <Footer isShow={isShowComponent && !noHeaderFooterPath.includes(router.pathname)} />
        </div>
    );
};

export default App;
