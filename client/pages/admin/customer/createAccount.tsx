import { ICreateAccountPage, ICreateAccountPageProps } from '@interfaces/pages/createaccount';
import CreateAccountForm from '@components/forms/CreateAccount';
import SideBar from '@components/layouts/admin/Sidebar';

const CreateAccount: ICreateAccountPage<ICreateAccountPageProps> = () => {
    return (
        <div className="pages__createAcc py-3 row">
            <div className="pages__createAcc-leftSide col-md-2">
                <SideBar />
            </div>
            <div className=" pages__createAcc-rightSide justify-content-center col-md-9">
                <h2 className="fw-bold mb-4 text-center">Create Account</h2>
                <CreateAccountForm />
            </div>
        </div>
    );
};

export default CreateAccount;
