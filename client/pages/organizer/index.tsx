import { Table } from '@components/index';
import SideBar from '@components/layouts/admin/Sidebar';
import { IEventListPage, IEventListPageProps, IEventListPageState } from '@interfaces/pages/eventpage';
import { fetchListEvent } from '@redux/actions/api';
import { http, images, routes } from '@utils/constants';
import { useRouter } from 'next/router';
import React, { createRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const EventPageOrganizer: IEventListPage<IEventListPageProps> = () => {
    const router = useRouter();

    const [state, setState] = useState<IEventListPageState>({
        events: [],
    });

    const { events } = state;

    const dispatch = useDispatch();
    const tableRef = createRef<ITableComponentHandle>();

    useEffect(() => {
        handleFetchListEvents();
    }, []);

    const handleFetchListEvents = async () => {
        dispatch(
            await fetchListEvent((res: IEventDataApiListRes | IErrorAPIRes | null) => {
                if (res && res?.code === http.SUCCESS_CODE) {
                    const data = (res as IEventDataApiListRes).result;
                    setState((prevState) => ({
                        ...prevState,
                        events: data,
                    }));
                }
            }),
        );
    };

    const renderData = events?.map((item) => {
        const editBtn = {
            export: {
                srcIcon: images.ICON_DETAIL,
                onClick: () =>
                    router.push({ pathname: routes.CLIENT.UPDATE_EVENT_PAGE.href, query: { id: item._id } }, undefined, { scroll: false }),
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
                title: '',
                isSort: false,
            },
            {
                title: 'Edit Events',
                isSort: false,
            },
            {
                title: 'Event Name',
                isSort: true,
            },
            {
                title: 'Ticket Price',
                isSort: true,
            },
            {
                title: 'Ticket Quantity',
                isSort: true,
            },
            {
                title: 'Location',
                isSort: true,
            },
            {
                title: 'Event Type',
                isSort: true,
            },
            {
                title: 'Description',
                isSort: true,
            },
            {
                title: 'Days End',
                isSort: true,
            },
            {
                title: 'Days Start',
                isSort: true,
            },
        ],
        body: {
            columns: [
                {
                    field: 'export',
                    isButton: true,
                },
                {
                    field: 'export',
                    isButton: true,
                },
                {
                    field: 'name',
                    className: 'text-center',
                },
                {
                    field: 'price',
                    className: 'text-center',
                },
                {
                    field: 'ticket_number',
                    className: 'text-center',
                },
                {
                    field: 'location',
                    className: 'text-center',
                },
                {
                    field: 'event_type',
                    className: 'text-center',
                },
                {
                    field: 'description',
                    className: 'text-center',
                },
                {
                    field: 'day_end',
                    className: 'text-center',
                },
                {
                    field: 'day_start',
                    className: 'text-center',
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
