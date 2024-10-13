import AddEventForm from '@components/forms/Event';
import { Box } from '@components/index';
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
            await fetchDetailsEvent(id?.toString() ?? '', (res: IEventUpdateByAdmin | IErrorAPIRes | null) => {
                if (res && res.code === http.SUCCESS_CODE) {
                    const event = (res as IEventUpdateByAdmin).result;
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
            <div className=" pages__addevent-rightSide justify-content-center col-md-12">
                <Box className='p-3'>
                    <h2 className="fw-bold mb-4 text-center">Update Event</h2>  
                    <AddEventForm event={event} />
                </Box>
            </div>
        </div>
    );
};

export default UpdateEventOrganizer;
