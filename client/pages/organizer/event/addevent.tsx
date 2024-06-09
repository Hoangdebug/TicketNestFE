import AddEventForm from '@components/forms/AddEvent';
import { IAddEventPage, IAddEventPageProps } from '@interfaces/pages/addevent';
import { images } from '@utils/constants';

const AddEventPage: IAddEventPage<IAddEventPageProps> = () => {
    return (
        <div className="pages__addevent">
            {/* <div className="pages__addevent-leftSide">
                <img className="pages__addevent-leftSide-logo" style={{ height: '100vh' }} src={images.LOGIN_LOGO} alt="" />
            </div> */}
            <div className=" pages__addevent-rightSide justify-content-center">
                <h2 className="fw-bold mb-4 text-center">Add Event</h2>
                <AddEventForm />
            </div>
        </div>
    );
};

export default AddEventPage;
