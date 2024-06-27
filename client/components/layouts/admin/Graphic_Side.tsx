import React, { useEffect } from 'react';
import { TextField, IconButton, Card, CardContent, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { routes } from '@utils/constants';
import { useSelector } from 'react-redux';
import { ReduxStates } from '@redux/reducers';
import { useRouter } from 'next/router';
import { authHelper } from '@utils/helpers';

const Graphic_Side: IGraphicSideComponent<IGraphicSideComponentProps> = () => {
    const { profile } = useSelector((states: ReduxStates) => states);
    const router = useRouter();

    useEffect(() => {
        if (authHelper.accessToken()) {
            const currentPath = router.pathname;
            if (currentPath === routes.CLIENT.LOGIN_PAGE.href || currentPath === routes.CLIENT.REGISTER_PAGE.href) {
                router.replace(routes.CLIENT.HOME_PAGE.href, undefined, { scroll: false });
            }
        } else {
            router.replace(routes.CLIENT.LOGIN_PAGE.href, undefined, { scroll: false });
        }
    }, [profile, router]);

    const summaryCards = [
        { title: 'Total Sales', value: '$1,200,000' },
        { title: 'Total Profit', value: '$300,000' },
        { title: 'Total Cost', value: '$900,000' },
        { title: 'Revenue', value: '$1,500,000' },
        { title: 'Today', value: '$50,000' },
    ];

    return (
        <div className="components__graphic-side">
            <div className="components__graphic-side-header">
                <TextField
                    variant="outlined"
                    placeholder="Search..."
                    className="components__graphic-side-header-searchBar"
                    InputProps={{
                        endAdornment: (
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        ),
                    }}
                />
                <div className="components__graphic-side-header-icons">
                    <div className="components__graphic-side-header-icons-account">
                        <AccountCircleIcon />
                        <span className="components__graphic-side-header-icons-account-name">{profile?.details?.username}</span>
                    </div>
                </div>
            </div>
            <div className="components__graphic-side-background">
                <div className="components__graphic-side-background-text">
                    <Typography variant="h4">Hello Devs!</Typography>
                    <Typography variant="h6">
                        We are on a mission to help developers like you to build beautiful projects for FREE
                    </Typography>
                </div>
            </div>
            <div className="components__graphic-side-summary">
                {summaryCards.map((card, index) => (
                    <Card key={index} className="components__graphic-side-summary-card">
                        <CardContent>
                            <Typography variant="h6">{card.title}</Typography>
                            <Typography variant="h5">{card.value}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Graphic_Side;
