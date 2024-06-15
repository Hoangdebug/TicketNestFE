import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { IHomePageProps, IHomePage } from '@interfaces/pages/home';
import { authHelper } from '@utils/helpers';
import NavBar from '@components/layouts/NavBar';
import { routes } from '@utils/constants';
import { EventList } from '@components/index';
import Tabs from '@components/commons/Tab';

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
            <div className="py-5">
                <EventList />
            </div>
            <div className="pages__home--host py-5 bases__background--white d-flex jus">
                <div className="p-5">
                    <h3 className="bases__font--40 fw-bolder">Host Engaging Online and Venue Events with Barren</h3>
                    <p className="m-0 bases__font--20 text-wrap">
                        Organise venue events and host online events with unlimited possibilities using our built-in virtual event platform.
                        Build a unique event experience for you and your attendees.
                    </p>
                </div>
            </div>
            <div className="py-5 pages__home--step">
                <div className="p-5">
                    <Tabs
                        type="material"
                        defaultActiveKey="step1"
                        tabs={[
                            {
                                title: 'Step 01',
                                event: 'step1',
                                content: 'hdhdhdhd',
                            },
                            {
                                title: 'Step 02',
                                event: 'step2',
                                content: 'hehehehe',
                            },
                            {
                                title: 'Step 03',
                                event: 'step3',
                                content: 'hoohohohohoho',
                            },
                            {
                                title: 'Step 04',
                                event: 'step4',
                                content: 'hihihhihih',
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
