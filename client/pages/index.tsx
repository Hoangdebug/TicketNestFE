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

    useEffect(() => {
        const accessToken = authHelper.accessToken();
        console.log(accessToken);
        if (accessToken) {
            const currentPath = router.pathname;
            console.log(currentPath);
            if (currentPath === routes.CLIENT.LOGIN_PAGE.href || currentPath === routes.CLIENT.REGISTER_PAGE.href) {
                router.push(routes.CLIENT.HOME_PAGE.href);
            }
        } else {
            router.push(routes.CLIENT.LOGIN_PAGE.href);
        }
    }, [router]);

    const changeLanguage = (lang: string) => {
        dispatch(setLocale(lang));
    };

    return <a href={routes.CLIENT.LOGIN_PAGE.href}>home Pages</a>;
};

export default HomePage;
