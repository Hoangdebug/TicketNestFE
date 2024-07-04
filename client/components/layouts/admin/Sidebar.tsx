import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { routes, images, enums } from '@utils/constants';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import TheatersIcon from '@mui/icons-material/Theaters';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogout } from '@redux/actions/api';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { ReduxStates } from '@redux/reducers';
import { TYPES } from '@utils/constants/enums';

const SideBar: ISideBarComponent<ISideBarComponentProps> = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { profile } = useSelector((states: ReduxStates) => states);

    const [openDropdowns, setOpenDropdowns] = useState<ISideBarComponentState>({
        event: false,
        customer: false,
        theater: false,
        settings: false,
    });

    const toggleDropdown = (menu: any) => {
        setOpenDropdowns((prevState) => ({
            ...prevState,
            [menu]: !prevState[menu],
        }));
    };

    const handleLogout = async () => {
        dispatch(await fetchLogout());
        router.replace(routes.CLIENT.LOGIN_PAGE.href, undefined, { scroll: false });
    };

    const sideBar = [
        {
            title: 'Dashboard',
            href: routes.CLIENT.ADMIN_PAGE.href,
            icon: <DashboardIcon />,
            class: '',
            roles: [enums.TYPES.ADMIN, enums.TYPES.ORGANIZER],
        },
        {
            title: 'Event',
            href: routes.CLIENT.ORGANIZER_LIST_EVENT.href,
            icon: <EventIcon />,
            class: '',
            roles: [enums.TYPES.ORGANIZER],
        },
        {
            title: 'Customer',
            key: 'customer',
            href: '#',
            icon: <PeopleIcon />,
            class: '',
            submenu: [
                { title: 'Customer List', href: routes.CLIENT.ADMIN_LIST_CUSTOMER_PAGE.href },
                { title: 'Customer Ban', href: routes.CLIENT.ADMIN_LIST_CUSTOMER_BAN_PAGE.href },
                { title: 'Customer Request', href: routes.CLIENT.ADMIN_LIST_CUSTOMER_REQUEST_PAGE.href },
            ],
            roles: [enums.TYPES.ADMIN],
        },
        {
            title: 'Event',
            key: 'theater',
            href: '#',
            icon: <TheatersIcon />,
            class: '',
            submenu: [{ title: 'Manager Event', href: routes.CLIENT.ADMIN_MANAGER_EVENT_PAGE.href }],
            roles: [enums.TYPES.ADMIN],
        },
        {
            title: 'Settings',
            key: 'settings',
            href: '#',
            icon: <SettingsIcon />,
            class: '',
            submenu: [{ title: 'Create Account', href: routes.CLIENT.ADMIN_CREATE_ACCOUNT_PAGE.href }],
            roles: [enums.TYPES.ADMIN],
        },
    ];

    return (
        <div className="components__sidebar-content">
            <div className="components__sidebar-content-logo">
                <img src={images.LOGO_SIDEBAR} alt="Logo" className="fluid" />
            </div>

            {profile?.type === enums.TYPES.ORGANIZER && (
                <button
                    className="components__sidebar-content-button"
                    onClick={() => {
                        router.push(routes.CLIENT.ADD_EVENT_PAGE.href);
                    }}
                >
                    + New Event
                </button>
            )}

            <div className="components__sidebar-content-item">
                {sideBar
                    ?.filter((item) => item.roles.includes((profile?.type as TYPES) ?? (enums.TYPES.ADMIN || enums.TYPES.ORGANIZER)))
                    ?.map((item, index) => (
                        <div key={index} className="bases__p--cusor">
                            <a
                                className="components__sidebar-content-item-subItem"
                                href={typeof item.href === 'string' ? item.href : '#'}
                                onClick={(e) => {
                                    if (item.submenu) {
                                        e.preventDefault();
                                        toggleDropdown(item.key);
                                    }
                                }}
                                style={{ cursor: item.submenu ? 'pointer' : 'default' }}
                            >
                                {item.icon}
                                <span className="ml-2">{item.title}</span>
                                {item.submenu && (
                                    <span className="ml-auto">{openDropdowns[item.key] ? <ExpandMoreIcon /> : <ChevronRightIcon />}</span>
                                )}
                            </a>
                            {item.submenu && openDropdowns[item.key] && (
                                <div className="components__sidebar-content-item-submenu ml-3">
                                    {item.submenu.map((subItem, subIndex) => (
                                        <div key={subIndex}>
                                            <a className="components__sidebar-content-item-submenu-navlink" href={subItem.href}>
                                                {subItem.title}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                <div className="pt-4 bases__p--cusor text-center" style={{ borderTop: '2px solid #ccc', cursor: 'pointer' }}>
                    <span className="d-flex align-item-center justify-content-center" onClick={handleLogout}>
                        <PowerSettingsNewIcon className="mx-1" />
                        Log Out
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
