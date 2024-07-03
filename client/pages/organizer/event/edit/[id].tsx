import AddEventForm from '@components/forms/Event';
import SideBar from '@components/layouts/admin/Sidebar';
import {
    IUpdateEventOrganizerPage,
    IUpdateEventOrganizerPageProps,
    IUpdateEventOrganizerPageState,
} from '@interfaces/pages/organizereventupdate';
import { fetchDetailsEvent } from '@redux/actions/api';
import { http } from '@utils/constants';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const UpdateEventOrganizer: IUpdateEventOrganizerPage<IUpdateEventOrganizerPageProps> = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { query } = router;
    const { id } = query;
    const [state, setState] = useState<IUpdateEventOrganizerPageState>({
        event: undefined,
    });
    const { event } = state;

    useEffect(() => {
        handleDetialsEvent();
    }, []);

    const handleDetialsEvent = async () => {
        dispatch(
            await fetchDetailsEvent(id?.toString() ?? '', (res: IEventDataApiRes | IErrorAPIRes | null) => {
                if (res && res.code === http.SUCCESS_CODE) {
                    const event = (res as IEventDataApiRes).result;
                    setState((prevState) => ({
                        ...prevState,
                        event: event,
                    }));
                }
            }),
        );
    };

    return (
        <div className="pages__addevent py-3 row">
            <div className="pages__addevent-leftSide col-md-2">
                <SideBar />
            </div>
            <div className=" pages__addevent-rightSide justify-content-center col-md-9">
                <h2 className="fw-bold mb-4 text-center">Update Event</h2>
                <AddEventForm event={event} />
            </div>
        </div>
    );
};

export default UpdateEventOrganizer;
