import SideBar from '@components/layouts/admin/Sidebar';
import AdminListCustomerComponents from '@components/layouts/Customer';
import { IAdminCustomerPage, IAdminCustomerPageProps, IAdminCustomerPageState } from '@interfaces/pages/admincustomer';
import { fetchListAdminCustomer } from '@redux/actions/api';
import { http } from '@utils/constants';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const CustomerListPageAdmin: IAdminCustomerPage<IAdminCustomerPageProps> = () => {
    const dispatch = useDispatch();

    const [state, setState] = useState<IAdminCustomerPageState>({
        customers: [],
    });
    const { customers } = state;

    useEffect(() => {
        handleFetchListCus();
    }, []);

    const updateCustomers = (newCustomers: IEditUserProfileDataAPI[]) => {
        setState((prevState) => ({
            ...prevState,
            customers: newCustomers,
        }));
    };

    const handleFetchListCus = async () => {
        dispatch(
            await fetchListAdminCustomer((res: IAdminCustomerListAPIRes | IErrorAPIRes | null) => {
                if (res && res?.code === http.SUCCESS_CODE) {
                    const dataCus = (res as IAdminCustomerListAPIRes).result;
                    const blockedCustomers = dataCus?.filter((customer) => customer.isBlocked !== true);
                    setState((prevState) => ({
                        ...prevState,
                        customers: blockedCustomers,
                    }));
                }
            }),
        );
    };

    return (
        <div className="pages__listCustomer py-3 row">
            <div className="pages__listCustomer-leftSide col-md-2">
                <SideBar />
            </div>
            <div className=" pages__listCustomer-rightSide justify-content-center col-md-9">
                <h2 className="fw-bold mb-4 text-center">Customer List</h2>
                <AdminListCustomerComponents customers={customers} updateCustomers={updateCustomers} />
            </div>
        </div>
    );
};

export default CustomerListPageAdmin;
