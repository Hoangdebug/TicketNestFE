import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { IHomePageProps, IHomePage } from '@interfaces/pages/home';
import { authHelper } from '@utils/helpers';
import NavBar from '@components/layouts/NavBar';
import { routes } from '@utils/constants';

const HomePage: IHomePage<IHomePageProps> = () => {
    const router = useRouter();

    useEffect(() => {
        if (authHelper.accessToken()) {
            const currentPath = router.pathname;
            if (currentPath === routes.CLIENT.LOGIN_PAGE.href || currentPath === routes.CLIENT.REGISTER_PAGE.href) {
                router.push(routes.CLIENT.HOME_PAGE.href);
            }
        } else {
            router.push(routes.CLIENT.LOGIN_PAGE.href);
        }
    }, [router]);

    return (
        <div className="pages__home">
            <div className="pb-5">
                <NavBar />
            </div>
            <div className="py-5">hehehehe</div>
        </div>
    );
};

export default HomePage;
