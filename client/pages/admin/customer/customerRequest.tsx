import { Button, Img, Table } from '@components/index';
import SideBar from '@components/layouts/admin/Sidebar';
import { ICustomerRequestPage, ICustomerRequestPageProps, ICustomerRequestPageState } from '@interfaces/pages/customerreuqest';
import { setModal } from '@redux/actions';
import { fetchListAdminCustomer, fetchUpdateOrganizerByAdmin } from '@redux/actions/api';
import { enums, http, images } from '@utils/constants';
import React, { createRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const CustomerRequestPage: ICustomerRequestPage<ICustomerRequestPageProps> = () => {
    const dispatch = useDispatch();
    const tableRef = createRef<ITableComponentHandle>();

    const [state, setState] = useState<ICustomerRequestPageState>({
        customers: [],
        ids: [],
        total: 0,
        organizerRequest: '',
    });

    const { customers, ids, organizerRequest } = state;

    useEffect(() => {
        handleFetchListCus();
    }, []);

    const handleFetchListCus = async () => {
        dispatch(
            await fetchListAdminCustomer((res: IAdminCustomerListAPIRes | IErrorAPIRes | null) => {
                if (res && res?.code === http.SUCCESS_CODE) {
                    const dataCus = (res as IAdminCustomerListAPIRes).result;
                    const blockedCustomers = dataCus?.filter(
                        (customer) =>
                            customer.type === enums.TYPES.USER &&
                            customer.isBlocked !== true &&
                            customer?.organizerRequest === enums.STATUS_ORGANIZER_REQUEST.PROCESSING,
                    );
                    setState((prevState) => ({
                        ...prevState,
                        customers: blockedCustomers,
                        total: blockedCustomers?.length,
                    }));
                }
            }),
        );
    };

    const handleUpdateOrganizerByAdmin = async () => {
        dispatch(
            await fetchUpdateOrganizerByAdmin(
                ids?.toString() ?? '',
                { organizerRequest },
                (res: IAdminUpdateOrganizerAPIRes | IErrorAPIRes | null) => {
                    if (res && res?.code === http.SUCCESS_CODE) {
                        handleFetchListCus();
                    }
                },
            ),
        );
    };

    const handleConfirmUpdateRole = async (id: string) => {
        setState((prevState) => ({ ...prevState, ids: [id] }));
        dispatch(
            setModal({
                isShow: true,
                content: (
                    <>
                        <div className="text-center bases__margin--bottom31">
                            <Img src={images.ICON_TIMES} className="bases__width--90 bases__height--75" />
                        </div>
                        <div className="bases__text--bold bases__font--14 text-center">Do you want to update this account</div>
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
                            handleUpdateOrganizerByAdmin();
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
    const renderData = customers?.map((item) => {
        const editBtn = {
            export: {
                srcIcon: images.ICON_DELETE,
                onClick: () => handleConfirmUpdateRole(item?._id ?? ''),
            },
        };

        let userType;
        switch (item.type) {
            case 'Admin':
                userType = 'ADMIN';
                break;
            case 'Organizer':
                userType = 'ORGANIZER';
                break;
            case 'User':
                userType = 'USER';
                break;
            default:
                userType = item.type;
        }

        return {
            ...item,
            type: userType,
            ...editBtn,
        };
    });

    const tableEventRender: ITableComponentProps = {
        heads: [
            {
                title: 'Update Role',
                isSort: false,
            },
            {
                title: 'Users Name',
                isSort: false,
            },
            {
                title: 'Days Of Birth',
                isSort: true,
            },
            {
                title: 'Gender',
                isSort: true,
            },
            {
                title: 'Phone',
                isSort: true,
            },
            {
                title: 'Address',
                isSort: true,
            },
            {
                title: 'Permission ',
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
                    field: 'username',
                    className: 'text-center',
                },
                {
                    field: 'dob',
                    className: 'text-center',
                },
                {
                    field: 'gender',
                    className: 'text-center',
                },
                {
                    field: 'phone',
                    className: 'text-center',
                },
                {
                    field: 'address',
                    className: 'text-center',
                },
                {
                    field: 'type',
                    className: 'text-center',
                },
            ],
            rows: renderData,
        },
    };
    return (
        <div className="row">
            <div className="col-md-2">
                <SideBar />
            </div>
            {customers && customers.length > 0 ? (
                <div className="col-md-9 pt-5">
                    <h2 className="fw-bold mb-4 text-center">Customer Request Organizer</h2>
                    <Table ref={tableRef} heads={tableEventRender.heads} body={tableEventRender.body} total={customers?.length} />
                </div>
            ) : (
                <div className="col-md-9 pt-5">
                    <h2 className="fw-bold mb-4 text-center">Customer Request Organizer</h2>
                    <div className="text-center bases__font--16 fw-bold bases__text--red"> No Request Organizer By Customer </div>
                </div>
            )}
        </div>
    );
};

export default CustomerRequestPage;
