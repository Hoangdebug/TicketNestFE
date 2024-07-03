import AddEventForm from '@components/forms/Event';
import SideBar from '@components/layouts/admin/Sidebar';
import { IAddEventPage, IAddEventPageProps } from '@interfaces/pages/addevent';

const AddEventPage: IAddEventPage<IAddEventPageProps> = () => {
    return (
        <div className="pages__addevent py-3 row">
            <div className="pages__addevent-leftSide col-md-2">
                <SideBar />
            </div>
            <div className=" pages__addevent-rightSide justify-content-center col-md-9">
                <h2 className="fw-bold mb-4 text-center">Add Event</h2>
                <AddEventForm />
            </div>
        </div>
    );
};

export default AddEventPage;
