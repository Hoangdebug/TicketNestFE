import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { IHomePageProps, IHomePage } from '@interfaces/pages/home';
import { authHelper } from '@utils/helpers';
import NavBar from '@components/layouts/NavBar';
import { routes } from '@utils/constants';
import { EventList } from '@components/index';
import Tabs from '@components/commons/Tab';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

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

    const stepData = (type: 'step1' | 'step2' | 'step3' | 'step4') => {
        switch (type) {
            case 'step1':
                return (
                    <div className="pt-5">
                        Sign up for free and create your event easily in minutes.
                        <div className="row pt-5">
                            <div className="col-md-4 px-2">
                                <h3 className="fw-bold">Sign up for free</h3>
                                <p className="text-wrap">
                                    Sign up easily using your Google or Facebook account or email and create your events in minutes.
                                </p>
                            </div>
                            <div className="col-md-4 px-2">
                                <h3 className="fw-bold">Use built-in event page template</h3>
                                <p className="text-wrap">
                                    Choose from our customised page templates specially designed to attract attendees.
                                </p>
                            </div>
                            <div className="col-md-4 px-2">
                                <h3 className="fw-bold">Customise your event page as you like</h3>
                                <p className="text-wrap">
                                    Add logo, collage hero images, and add details to create an outstanding event page.
                                </p>
                            </div>
                        </div>
                    </div>
                );
                break;
            case 'step2':
                return (
                    <div className="pt-5">
                        Sign up for free and create your event easily in minutes.
                        <div className="row pt-5">
                            <div className="col-md-4 px-2">
                                <h3 className="fw-bold">Sign up for free</h3>
                                <p className="text-wrap">
                                    Sign up easily using your Google or Facebook account or email and create your events in minutes.
                                </p>
                            </div>
                            <div className="col-md-4 px-2">
                                <h3 className="fw-bold">Use built-in event page template</h3>
                                <p className="text-wrap">
                                    Choose from our customised page templates specially designed to attract attendees.
                                </p>
                            </div>
                            <div className="col-md-4 px-2">
                                <h3 className="fw-bold">Customise your event page as you like</h3>
                                <p className="text-wrap">
                                    Add logo, collage hero images, and add details to create an outstanding event page.
                                </p>
                            </div>
                        </div>
                    </div>
                );
                break;
            case 'step3':
                return (
                    <div className="pt-5">
                        Sign up for free and create your event easily in minutes.
                        <div className="row pt-5">
                            <div className="col-md-4 px-2">
                                <h3 className="fw-bold">Sign up for free</h3>
                                <p className="text-wrap">
                                    Sign up easily using your Google or Facebook account or email and create your events in minutes.
                                </p>
                            </div>
                            <div className="col-md-4 px-2">
                                <h3 className="fw-bold">Use built-in event page template</h3>
                                <p className="text-wrap">
                                    Choose from our customised page templates specially designed to attract attendees.
                                </p>
                            </div>
                            <div className="col-md-4 px-2">
                                <h3 className="fw-bold">Customise your event page as you like</h3>
                                <p className="text-wrap">
                                    Add logo, collage hero images, and add details to create an outstanding event page.
                                </p>
                            </div>
                        </div>
                    </div>
                );
                break;
            case 'step4':
                return (
                    <div className="pt-5">
                        Sign up for free and create your event easily in minutes.
                        <div className="row pt-5">
                            <div className="col-md-4 px-2">
                                <h3 className="fw-bold">Sign up for free</h3>
                                <p className="text-wrap">
                                    Sign up easily using your Google or Facebook account or email and create your events in minutes.
                                </p>
                            </div>
                            <div className="col-md-4 px-2">
                                <h3 className="fw-bold">Use built-in event page template</h3>
                                <p className="text-wrap">
                                    Choose from our customised page templates specially designed to attract attendees.
                                </p>
                            </div>
                            <div className="col-md-4 px-2">
                                <h3 className="fw-bold">Customise your event page as you like</h3>
                                <p className="text-wrap">
                                    Add logo, collage hero images, and add details to create an outstanding event page.
                                </p>
                            </div>
                        </div>
                    </div>
                );
                break;
        }
    };

    const titleTabs = (type: 'step1' | 'step2' | 'step3' | 'step4') => {
        switch (type) {
            case 'step1':
                return (
                    <div className="d-flex flex-column">
                        <h3>Step 1</h3>
                        <h4>Create Your Event</h4>
                    </div>
                );
                break;
            case 'step2':
                return (
                    <div className="d-flex flex-column">
                        <h3>Step 2</h3>
                        <h4>Create Your Event</h4>
                    </div>
                );
                break;
            case 'step3':
                return (
                    <div className="d-flex flex-column">
                        <h3>Step 3</h3>
                        <h4>Create Your Event</h4>
                    </div>
                );
                break;
            case 'step4':
                return (
                    <div className="d-flex flex-column">
                        <h3>Step 4</h3>
                        <h4>Create Your Event</h4>
                    </div>
                );
                break;
            default:
                return (
                    <div className="d-flex flex-column">
                        <h3>Step 1</h3>
                        <h4>Create Your Event</h4>
                    </div>
                );
                break;
        }
    };

    return (
        <div className="pages__home">
            <div className="pb-5">
                <NavBar />
            </div>
            <div className="py-5">
                <EventList />
            </div>
            <div className="pages__home--host py-5 bases__background--white d-flex flex-column">
                <div className="p-5">
                    <h3 className="bases__font--40 fw-bolder">Host Engaging Online and Venue Events with Barren</h3>
                    <p className="m-0 bases__font--20 text-wrap">
                        Organise venue events and host online events with unlimited possibilities using our built-in virtual event platform.
                        Build a unique event experience for you and your attendees.
                    </p>
                </div>
                <div className="" style={{ minHeight: '10vh' }}>
                    <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                        <SwiperSlide>Slide 1</SwiperSlide>
                        <SwiperSlide>Slide 2</SwiperSlide>
                    </Swiper>
                </div>
            </div>

            <div className="py-5 pages__home--step">
                <div className="p-5 ">
                    <h2 className="fw-bolder">Become an Event Manager in 4 Easy Steps</h2>
                    <p className="m-0 bases__font--20 text-wrap">
                        Organise venue events and host online events with unlimited possibilities using our built-in virtual event platform.
                        Build a unique event experience for you and your attendees.
                    </p>
                </div>
                <div className="p-5">
                    <Tabs
                        type="material"
                        defaultActiveKey="step1"
                        tabs={[
                            {
                                title: titleTabs('step1'),
                                event: 'step1',
                                content: stepData('step1'),
                            },
                            {
                                title: titleTabs('step2'),
                                event: 'step2',
                                content: stepData('step2'),
                            },
                            {
                                title: titleTabs('step3'),
                                event: 'step3',
                                content: stepData('step3'),
                            },
                            {
                                title: titleTabs('step4'),
                                event: 'step4',
                                content: stepData('step4'),
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
