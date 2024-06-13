import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { ReduxStates } from '@redux/reducers';
import { routes, images } from '@utils/constants';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import TheatersIcon from '@mui/icons-material/Theaters';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { IAdminPage, IAdminPageProps, IAdminPageState } from '@interfaces/pages/admin';
import Graphic_Side from '@components/layouts/admin/Graphic_Side';
import Footer_Admin from '@components/layouts/admin/Footer_Admin';
import SideBar from '@components/layouts/admin/Sidebar';
import Visitor from '@components/layouts/admin/Visitor';
import Activity_Overview from '@components/layouts/admin/Activity_Overview';
import Main_Chart from '@components/layouts/admin/Main_Chart';
import Earnings from '@components/layouts/admin/Earnings';
import Conversions from '@components/layouts/admin/Conversions';
import Enterprise_Clients from '@components/layouts/admin/Enterprise_Clients';

const AdminPages: IAdminPage<IAdminPageProps> = () => {
    const { profile } = useSelector((states: ReduxStates) => states);
    const router = useRouter();

    return (
        <div className="pages__admin row">
            <div className="pages__admin-content col-md-2 p-4 col-sm-12">
                <SideBar />
            </div>
            <div className="pages__admin-main col-md-10 col-sm-12">
                {/* Main content area */}
                <div className="pages__admin-main-graphic">
                    {/* Graphic side content */}
                    <Graphic_Side />
                </div>
                <div className="pages__admin-main-content row">
                    <div className="col-md-8 col-sm-12">
                        {/* Left side content */}
                        <br></br>
                        <Main_Chart />
                        <br></br>
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                {' '}
                                <Earnings /> <br></br>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                {' '}
                                <Conversions /> <br></br>{' '}
                            </div>
                        </div>
                        <Enterprise_Clients />
                        <br></br>
                    </div>
                    <div className="col-md-4 col-sm-12">
                        {/* Right side content */}
                        <br></br>
                        <Visitor />
                        <br></br>
                        <Activity_Overview />
                        <br></br>
                    </div>
                </div>
                <div className="pages__admin-main-footer">
                    {/* Footer content */}
                    <Footer_Admin />
                </div>
            </div>
        </div>
    );
};

export default AdminPages;
