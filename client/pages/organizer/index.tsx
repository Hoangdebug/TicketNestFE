import { Table } from '@components/index';
import SideBar from '@components/layouts/admin/Sidebar';
import { images } from '@utils/constants';
import React, { createRef, useState } from 'react';

const eventData = [
    {
        eventId: 1,
        eventName: 'Tech Conference 2024',
        startDate: '2024-07-10 09:00',
        endDate: '2024-07-12 17:00',
        location: 'San Francisco, CA',
        organizer: 'Tech Corp',
        description: 'An annual conference discussing the latest trends in technology.',
        eventType: 'Conference',
        participantCount: 300,
        status: 'Upcoming',
        participationFee: 150,
        supportContact: 'support@techconference.com',
        registrationLink: 'https://techconference.com/register',
        notes: 'Early bird discount available until June 15th.',
    },
    {
        eventId: 2,
        eventName: 'Art Expo 2024',
        startDate: '2024-08-01 10:00',
        endDate: '2024-08-03 18:00',
        location: 'New York, NY',
        organizer: 'ArtWorld',
        description: 'A showcase of contemporary art from around the world.',
        eventType: 'Exhibition',
        participantCount: 500,
        status: 'Upcoming',
        participationFee: 20,
        supportContact: 'info@artexpo.com',
        registrationLink: 'https://artexpo.com/tickets',
        notes: 'Children under 12 get free entry.',
    },
    {
        eventId: 3,
        eventName: 'Health & Wellness Retreat',
        startDate: '2024-09-15 08:00',
        endDate: '2024-09-20 16:00',
        location: 'Sedona, AZ',
        organizer: 'Wellness Group',
        description: 'A week-long retreat focusing on health and wellness practices.',
        eventType: 'Retreat',
        participantCount: 100,
        status: 'Upcoming',
        participationFee: 800,
        supportContact: 'contact@wellnessretreat.com',
        registrationLink: 'https://wellnessretreat.com/signup',
        notes: 'Includes accommodation and meals.',
    },
    {
        eventId: 4,
        eventName: 'Business Leadership Summit',
        startDate: '2024-10-05 09:00',
        endDate: '2024-10-07 17:00',
        location: 'Chicago, IL',
        organizer: 'Business Leaders Inc.',
        description: 'Summit for business leaders to share strategies and insights.',
        eventType: 'Summit',
        participantCount: 200,
        status: 'Upcoming',
        participationFee: 500,
        supportContact: 'support@businessleaders.com',
        registrationLink: 'https://businessleaders.com/register',
        notes: 'Networking sessions included.',
    },
    {
        eventId: 5,
        eventName: 'Music Festival 2024',
        startDate: '2024-11-10 12:00',
        endDate: '2024-11-12 23:00',
        location: 'Austin, TX',
        organizer: 'MusicFest Co.',
        description: 'A three-day music festival featuring various genres.',
        eventType: 'Festival',
        participantCount: 10000,
        status: 'Upcoming',
        participationFee: 100,
        supportContact: 'help@musicfest.com',
        registrationLink: 'https://musicfest.com/tickets',
        notes: 'VIP passes available.',
    },
];

const EventPageOrganizer = () => {
    const tableRef = createRef<ITableComponentHandle>();
    const [state, setState] = useState();

    const renderData = eventData?.map((item) => {
        const editBtn = {
            export: {
                srcIcon: images.ICON_DETAIL,
            },
        };

        return {
            ...item,
            ...editBtn,
        };
    });

    const tableEventRender: ITableComponentProps = {
        heads: [
            {
                title: 'Event ID',
                isSort: true,
            },
            {
                title: 'Event Name',
                isSort: true,
            },
            {
                title: 'Start Date',
                isSort: true,
            },
            {
                title: 'End Date',
                isSort: true,
            },
            {
                title: 'Location',
                isSort: true,
            },
            {
                title: 'Organizer',
                isSort: true,
            },
            {
                title: 'Description',
                isSort: true,
            },
            {
                title: 'Event Type',
                isSort: true,
            },
            {
                title: 'Participant Count',
                isSort: true,
            },
            {
                title: 'Status',
                isSort: true,
            },
            {
                title: 'Participation Fee',
                isSort: true,
            },
            {
                title: 'Support Contact',
                isSort: true,
            },
            {
                title: 'Registration Link',
                isSort: true,
            },
            {
                title: 'Notes',
                isSort: true,
            },
            {
                title: 'Action',
                isSort: false,
            },
        ],
        body: {
            columns: [
                {
                    field: 'eventId',
                },
                {
                    field: 'eventName',
                },
                {
                    field: 'startDate',
                },
                {
                    field: 'endDate',
                },
                {
                    field: 'location',
                },
                {
                    field: 'organizer',
                },
                {
                    field: 'description',
                },
                {
                    field: 'eventType',
                },
                {
                    field: 'participantCount',
                },
                {
                    field: 'status',
                },
                {
                    field: 'participationFee',
                },
                {
                    field: 'supportContact',
                },
                {
                    field: 'registrationLink',
                },
                {
                    field: 'notes',
                },
                {
                    // isButton: true,
                },
            ],
            rows: renderData,
        },
    };
    return (
        <div className="pages__organizer pt-5 row">
            <div className="col-md-2">
                <SideBar />
            </div>
            <div className="pages__organizer-table">
                <Table ref={tableRef} heads={tableEventRender.heads} body={tableEventRender.body} />
            </div>
        </div>
    );
};

export default EventPageOrganizer;
