import { Table } from '@components/index';
import SideBar from '@components/layouts/admin/Sidebar';
import { ICustomerRequestPage, ICustomerRequestPageProps, ICustomerRequestPageState } from '@interfaces/pages/customerreuqest';
import { fetchListAdminCustomer } from '@redux/actions/api';
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
    });

    const { customers, ids } = state;

    useEffect(() => {
        handleFetchListCus();
    }, []);

    const handleFetchListCus = async () => {
        dispatch(
            await fetchListAdminCustomer((res: IAdminCustomerListAPIRes | IErrorAPIRes | null) => {
                if (res && res?.code === http.SUCCESS_CODE) {
                    const dataCus = (res as IAdminCustomerListAPIRes).result;
                    const blockedCustomers = dataCus?.filter(
                        (customer) => customer.type === enums.TYPES.USER && customer.isBlocked === true,
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

    const renderData = customers?.map((item) => {
        const editBtn = {
            export: {
                srcIcon: images.ICON_DELETE,
                // onClick: () => handleConfirmDelete(item?._id ?? ''),
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
            <div className="col-md-9">
                <h2 className="fw-bold mb-4 text-center">Customer Request Organizer</h2>
                <Table ref={tableRef} heads={tableEventRender.heads} body={tableEventRender.body} total={customers?.length} />
            </div>
        </div>
    );
};

export default CustomerRequestPage;
