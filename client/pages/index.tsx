import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useSelector, useDispatch } from 'react-redux';
import { ReduxStates } from '@redux/reducers';
import { setLocale } from '@redux/actions';

import { useTrans } from '@utils/hooks';
import { enums, images, routes } from '@utils/constants';

import { IHomePageProps, IHomePage, IHomePageState } from '@interfaces/pages/home';
import { authHelper } from '@utils/helpers';

const HomePage: IHomePage<IHomePageProps> = () => {
    const trans = useTrans();
    const router = useRouter();
    const dispatch = useDispatch();
    const { locale } = useSelector((states: ReduxStates) => states);
    const { profile } = useSelector((states: ReduxStates) => states);

    const [state, setState] = useState<IHomePageState>({
        checkboxChecked: [],
        radioChecked: '1',
    });
    const token = authHelper.accessToken();
    useEffect(() => {
        if (!token) {
            router.push(routes.CLIENT.LOGIN_PAGE.href);
        }
    }, [token]);
    const isUser = profile?.details?.role;

    if (isUser?.includes(enums?.ROLE?.USER)) {
        return <div className="pages__home container">Home page</div>;
    }

    const changeLanguage = (lang: string) => {
        dispatch(setLocale(lang));
    };

    return <></>;
};

export default HomePage;
