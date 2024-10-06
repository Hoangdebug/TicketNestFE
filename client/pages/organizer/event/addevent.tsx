import AddEventForm from '@components/forms/Event';
import { IAddEventPage, IAddEventPageProps } from '@interfaces/pages/addevent';

const AddEventPage: IAddEventPage<IAddEventPageProps> = () => {
    return (
        <div className="pages__addevent py-3 row">
            <div className=" pages__addevent-rightSide justify-content-center col-md-9">
                <h2 className="fw-bold mb-4 text-center">Add Event</h2>
                <AddEventForm />
            </div>
        </div>
    );
};

export default AddEventPage;
