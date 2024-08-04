import { IAdminPage, IAdminPageProps } from '@interfaces/pages/admin';
import Graphic_Side from '@components/layouts/admin/Graphic_Side';
import Footer_Admin from '@components/layouts/admin/Footer_Admin';
import SideBar from '@components/layouts/admin/Sidebar';
import Visitor from '@components/layouts/admin/Visitor';
import Activity_Overview from '@components/layouts/admin/Activity_Overview';
import Main_Chart from '@components/layouts/admin/Main_Chart';
import Earnings from '@components/layouts/admin/Earnings';
import Conversions from '@components/layouts/admin/Conversions';
import Enterprise_Clients from '@components/layouts/admin/Enterprise_Clients';
import Rightside_Content from '@components/layouts/Rightside_content';
import { useSelector } from 'react-redux';
import { ReduxStates } from '@redux/reducers';
import { useEffect, useState } from 'react';
import { enums, routes } from '@utils/constants';
import { useRouter } from 'next/router';
import { authHelper } from '@utils/helpers';

const AdminPages: IAdminPage<IAdminPageProps> = () => {
    const { profile } = useSelector((states: ReduxStates) => states);
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(true);
    const [isAuthorized1, setIsAuthorized1] = useState<boolean | null>(true);

    useEffect(() => {
        if (profile && authHelper.accessToken()) {
            const isAdminOrOrganizer = profile?.type === enums.TYPES.ADMIN || profile?.type === enums.TYPES.ORGANIZER;
            setIsAuthorized1(isAdminOrOrganizer);

            if (!isAdminOrOrganizer) {
                setIsAuthorized(false);
            } else {
                setIsAuthorized(true);
            }
        }
    }, [profile, router]);

    const adminRouters: string[] = [routes.CLIENT.ADMIN_PAGE.href];
    const userRouters: string[] = [routes.CLIENT.HOME_PAGE.href];

    useEffect(() => {
        if (isAuthorized1 && !isAuthorized && adminRouters.includes(router.pathname)) {
            router.push(routes.CLIENT.ERROR403_PAGE.href, undefined, { scroll: false });
        } else if ((isAuthorized1 && !isAuthorized) || (!isAuthorized1 && !isAuthorized && userRouters.includes(router.pathname))) {
            router.push(routes.CLIENT.ERROR403_PAGE.href, undefined, { scroll: false });
        }
    }, [isAuthorized, isAuthorized1]);

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    if (isAuthorized === false) {
        return null;
    }

    return (
        <div className="pages__admin row">
            <div className="pages__admin-content col-md-2 p-4 col-sm-12">
                <SideBar />
            </div>
            <div className="pages__admin-main col-md-10 col-sm-12">
                <div className="pages__admin-main-graphic">
                    <Graphic_Side />
                </div>
                <div className="pages__admin-main-content row">
                    <div className="col-md-8 col-sm-12">
                        <br></br>
                        <Main_Chart />
                        <br></br>
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <Earnings /> <br></br>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <Conversions /> <br></br>{' '}
                            </div>
                        </div>
                        <Enterprise_Clients />
                        <br></br>
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <Rightside_Content />
                        <br></br>
                        <Visitor />
                        <br></br>
                        <Activity_Overview />
                        <br></br>
                    </div>
                </div>
                <div className="pages__admin-main-footer">
                    <Footer_Admin />
                </div>
            </div>
        </div>
    );
};

export default AdminPages;
