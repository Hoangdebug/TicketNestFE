import { Button, Img, Select, Table } from '@components/index';
import { IEventManagerAcceptPage, IEventManagerAcceptPageProps, IEventManagerAcceptPageState } from '@interfaces/pages/eventaccept';
import { setModal } from '@redux/actions';
import { fetchListEvent, fetchUpdateStatusEventByAdmin } from '@redux/actions/api';
import { enums, http, images } from '@utils/constants';
import React, { createRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const EventManagerAcceptPage: IEventManagerAcceptPage<IEventManagerAcceptPageProps> = () => {
    const dispatch = useDispatch();
    const tableRef = createRef<ITableComponentHandle>();

    const [state, setState] = useState<IEventManagerAcceptPageState>({
        event: [],
        status: enums.EventStatus.ACCEPTED,
    });

    const { event, totalItems, pages, status } = state;

    useEffect(() => {
        handleFetchListEvents();
    }, [pages]);

    const handleOnChange = (field: string, value: string | number | boolean) => {
        setState((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleFetchListEvents = async () => {
        dispatch(
            await fetchListEvent((res: IEventDataApiListRes | IErrorAPIRes | null) => {
                if (res && res?.code === http.SUCCESS_CODE) {
                    const data = (res as IEventDataApiListRes).result?.dataEvent;
                    const filteredData = data?.filter((event) => event.status === enums.EventStatus.PENDING);
                    setState((prevState) => ({
                        ...prevState,
                        event: filteredData,
                        totalItems: (res as IEventDataApiListRes).result?.metadata?.totalItems,
                        pages: (res as IEventDataApiListRes).result?.metadata?.pages,
                    }));
                }
            }),
        );
    };

    const handleUpdateStatusEventByAdmin = async (idsToUpdate: string[]) => {
        dispatch(
            await fetchUpdateStatusEventByAdmin(idsToUpdate.join(','), { status }, (res: IEventUpdateByAdmin | IErrorAPIRes | null) => {
                if (res?.code === http.SUCCESS_CODE) {
                    handleFetchListEvents();
                } else {
                    dispatch(
                        setModal({
                            isShow: true,
                            content: (
                                <>
                                    <div className="text-center bases__margin--bottom31">
                                        <Img src={images.ICON_CLOSE} className="bases__width--90 bases__height--75" />
                                    </div>
                                    <div className="bases__text--bold bases__font--14 text-center">Error While Update Status Event</div>
                                </>
                            ),
                        }),
                    );
                }
            }),
        );
    };

    const renderEventTypeOptions = () => {
        const eventTypeOptions = [
            {
                value: enums.EventStatus.PENDING,
                label: enums.EventStatus.PENDING,
            },
            {
                value: enums.EventStatus.CANCELLED,
                label: enums.EventStatus.CANCELLED,
            },
            {
                value: enums.EventStatus.ACCEPTED,
                label: enums.EventStatus.ACCEPTED,
            },
        ];

        return eventTypeOptions;
    };

    const handleConfirmUpdate = async (id: string) => {
        dispatch(
            setModal({
                isShow: true,
                content: (
                    <>
                        <div className="text-center bases__margin--bottom31">
                            <Img src={images.ICON_WARNING_MODEL} className="bases__width--90 bases__height--75" />
                        </div>
                        <div className="bases__text--bold bases__font--14 text-center">Do You Want To Accpet This Event?</div>
                        <div className="pt-3">
                            <Select
                                className="p-2"
                                value={status}
                                onChange={(value: string) => handleOnChange('status', value)}
                                options={renderEventTypeOptions()}
                            />
                        </div>
                    </>
                ),
                button: (
                    <Button
                        className="bases__margin--right32"
                        fontSize="14"
                        textColor="white"
                        buttonText="OK"
                        background="blue"
                        onClick={() => {
                            handleUpdateStatusEventByAdmin([id]);
                            dispatch(
                                setModal({
                                    isShow: false,
                                }),
                            );
                        }}
                    />
                ),
            }),
        );
    };

    const renderData = event?.map((item) => {
        const editBtn = {
            export: {
                srcIcon: images.ICON_DETAIL,
                onClick: () => handleConfirmUpdate(item?._id ?? ''),
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
        <div className="row">
            <div className="col-md-9">
                <h2 className="pt-5 text-center">Event Manager Accept</h2>
                {event && event.length > 0 ? (
                    <Table
                        ref={tableRef}
                        heads={tableEventRender.heads}
                        body={tableEventRender.body}
                        total={totalItems}
                        page={pages}
                        // onChangePage={(page) => {
                        //     setState((prevState) => ({
                        //         ...prevState,
                        //         pages: page,
                        //     }));
                        // }}
                    />
                ) : (
                    <div className="text-center pt-5 fw-bold bases__text--red">No Event Need To Accept</div>
                )}
            </div>
        </div>
    );
};

export default EventManagerAcceptPage;
