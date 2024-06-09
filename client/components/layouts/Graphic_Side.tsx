import React from 'react';
import { TextField, IconButton, Card, CardContent, Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { IGraphicSideComponent, IGraphicSideComponentProps } from '@interfaces/components/graphicSide';
import { images } from '@utils/constants';

const Graphic_Side: React.FC = () => {
    const summaryCards = [
        { title: 'Total Sales', value: '$1,200,000' },
        { title: 'Total Profit', value: '$300,000' },
        { title: 'Total Cost', value: '$900,000' },
        { title: 'Revenue', value: '$1,500,000' },
        // { title: 'Net Income', value: '$200,000' },
        { title: 'Today', value: '$50,000' },
    ];

    return (
        <div className="graphic-side">
            <div className="graphic-side-header">
                <TextField
                    variant="outlined"
                    placeholder="Search..."
                    className="search-bar"
                    InputProps={{
                        endAdornment: (
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        ),
                    }}
                />
                <div className="graphic-side-icons">
                    <img src={images.UK_FLAG} alt="Flag" className="graphic-side-icon" />
                    <IconButton>
                        <MailIcon />
                    </IconButton>
                    <IconButton>
                        <NotificationsIcon />
                    </IconButton>
                    <div className="graphic-side-account">
                        <AccountCircleIcon />
                        <span className="account-name">Admin Name</span>
                    </div>
                </div>
            </div>
            <div className="graphic-side-background">
                <div className="background-text">
                    <Typography variant="h4">Hello Devs!</Typography>
                    <Typography variant="h6">
                        We are on a mission to help developers like you to build beautiful projects for FREE
                    </Typography>
                </div>
            </div>
            <div className="graphic-side-summary row">
                {summaryCards.map((card, index) => (
                    <Card key={index} className="summary-card col-md-2">
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
