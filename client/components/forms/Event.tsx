import { createRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Validator from '@components/commons/Validator';
import { validateHelper } from '@utils/helpers';

import Input from '@components/commons/Input';
import DateTimePicker from '@components/commons/DateTimePicker';
import { useDispatch } from 'react-redux';
import { fetchAddEvent, fetchUpdateEvent } from '@redux/actions/api';
import { enums, http, routes } from '@utils/constants';
import Select from '@components/commons/Select';
import Button from '@components/commons/Button';

const AddEventForm: IAddEventComponent<IAddEventComponentProps> = (props) => {
    const { event } = props;

    const dispatch = useDispatch();
    const router = useRouter();
    const { query } = router;
    const { id } = query;

    const [state, setState] = useState<IAddEventComponentState>({
        isValidateStartDateTime: true,
        isValidateEndDateTime: true,
        eventAdd: {
            ...(event ?? {}),
        },
    });
    const { eventAdd, isValidateStartDateTime, isValidateEndDateTime } = state;

    const titleValidatorRef = createRef<IValidatorComponentHandle>();
    const descriptionValidatorRef = createRef<IValidatorComponentHandle>();
    const bannerValidatorRef = createRef<IValidatorComponentHandle>();
    const startDateValidatorRef = createRef<IValidatorComponentHandle>();
    const endDateValidatorRef = createRef<IValidatorComponentHandle>();
    const locationValidatorRef = createRef<IValidatorComponentHandle>();
    const ticketTypeValidatorRef = createRef<IValidatorComponentHandle>();
    const ticketPriceValidatorRef = createRef<IValidatorComponentHandle>();
    const ticketQuantityValidatorRef = createRef<IValidatorComponentHandle>();
    const startDateTimeValidatorRef = createRef<IValidatorComponentHandle>();
    const endDateTimeValidatorRef = createRef<IValidatorComponentHandle>();

    const handleOnChange = (field: string, value: string | number | boolean) => {
        setState((prevState) => ({
            ...prevState,
            eventAdd: {
                ...prevState.eventAdd,
                [field]: value,
            },
        }));
    };

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            eventAdd: {
                ...prevState.eventAdd,
                name: event?.name ?? '',
                description: event?.description ?? '',
                day_start: event?.day_start ?? '',
                day_end: event?.day_end ?? '',
                event_type: event?.event_type ?? enums.EVENTTYPE.MUSIC,
                location: event?.location ?? '',
                price: event?.price ?? 0,
                ticket_number: event?.ticket_number ?? enums.EVENTTICKET.BASE,
            },
        }));
    }, [event]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            setState({
                eventAdd: undefined,
            });
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const hanldeCancelBack = () => {
        router.back();
    };

    const handleSetValidateDateTime = (value: boolean, field: 'start' | 'end' = 'start') => {
        if (field === 'start') {
            setState((prevState) => ({
                ...prevState,
                isValidateStartDateTime: value,
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                isValidateEndDateTime: value,
            }));
        }
    };

    const renderEventTypeOptions = () => {
        const eventTypeOptions = [
            {
                value: enums.EVENTTYPE.MUSIC,
                label: enums.EVENTTYPE.MUSIC,
            },
            {
                value: enums.EVENTTYPE.DRAMATIC,
                label: enums.EVENTTYPE.DRAMATIC,
            },
            {
                value: enums.EVENTTYPE.WORKSHOP,
                label: enums.EVENTTYPE.WORKSHOP,
            },
        ];

        return eventTypeOptions;
    };

    const renderEventTicketOptions = () => {
        const eventTicketOptions = [
            {
                value: enums.EVENTTICKET.BASE,
                label: enums.EVENTTICKET.BASE,
            },
            {
                value: enums.EVENTTICKET.MEDIUM,
                label: enums.EVENTTICKET.MEDIUM,
            },
            {
                value: enums.EVENTTICKET.LARGE,
                label: enums.EVENTTICKET.LARGE,
            },
        ];

        return eventTicketOptions;
    };

    const handleValidateStartDateTime = () => {
        handleSetValidateDateTime(true);
        if (eventAdd?.day_start && !validateHelper.isDate(eventAdd?.day_start)) {
            handleSetValidateDateTime(false);
        }
    };

    const handleValidateEndDateTime = () => {
        handleSetValidateDateTime(true, 'end');
        endDateTimeValidatorRef?.current?.onValidateMessage('');

        if (eventAdd?.day_end && !validateHelper.isDate(eventAdd?.day_end)) {
            handleSetValidateDateTime(false, 'end');
        }
    };

    const handleSubmitUpdateEvent = async () => {
        dispatch(
            await fetchUpdateEvent(id?.toString() ?? '', eventAdd ?? {}, (res: IEventDataApiRes | IErrorAPIRes | null) => {
                if (res?.code === http.SUCCESS_CODE) {
                    router.push(routes.CLIENT.ORGANIZER_LIST_EVENT.href, undefined, { scroll: false });
                } else if (res?.code === http.ERROR_EXCEPTION_CODE) {
                    alert(res?.mes);
                }
            }),
        );
    };

    const handleSubmitAddEvent = async () => {
        dispatch(
            await fetchAddEvent(eventAdd ?? {}, (res: IEventDataApiRes | IErrorAPIRes | null) => {
                if (res?.code === http.SUCCESS_CODE) {
                    router.push(routes.CLIENT.ORGANIZER_LIST_EVENT.href, undefined, { scroll: false });
                } else if (res?.code === http.ERROR_EXCEPTION_CODE) {
                    alert(res?.mes);
                }
            }),
        );
    };

    const handleSubmit = async () => {
        let isValidate = true;

        const validator = [
            { ref: titleValidatorRef, value: eventAdd?.name, message: 'Title Is Not Empty!' },
            { ref: descriptionValidatorRef, value: eventAdd?.description, message: 'Description Is Not Empty!' },
            { ref: bannerValidatorRef, value: eventAdd?.image, message: 'Banner Is Not Empty!' },
            { ref: startDateValidatorRef, value: eventAdd?.day_start, message: 'Start Date Is Not Empty!' },
            { ref: endDateValidatorRef, value: eventAdd?.day_end, message: 'End Date Is Not Empty!' },
            { ref: locationValidatorRef, value: eventAdd?.location, message: 'Location Is Not Empty!' },
            { ref: ticketTypeValidatorRef, value: eventAdd?.event_type, message: 'TicketType Is Not Empty!' },
            { ref: ticketPriceValidatorRef, value: eventAdd?.price, message: 'Ticket Price Is Not Empty!' },
            { ref: ticketQuantityValidatorRef, value: eventAdd?.ticket_number, message: 'Ticket Quantity Is Not Empty!' },
        ];

        validator.forEach(({ ref, value, message }) => {
            ref.current?.onValidateMessage('');
            if (validateHelper.isEmpty(String(value ?? ''))) {
                ref.current?.onValidateMessage(message);
                isValidate = false;
            } else if (validateHelper.isCharacters(String(value ?? ''))) {
                ref.current?.onValidateMessage(`Your ${message} Cannot Be Less Than 2 Characters`);
                isValidate = false;
            }
        });

        if (isValidate) {
            if (id) {
                await handleSubmitUpdateEvent();
            } else {
                await handleSubmitAddEvent();
            }
        }
    };

    return (
        <div className="components__addevent ">
            <div className="components__addevent-form p-3">
                <div className="row">
                    <div className="col-md-6 gap-4 d-flex flex-column ">
                        <div className="form-group">
                            <label htmlFor="title" className="pb-2">
                                Title <span className="text-danger">*</span>{' '}
                            </label>
                            <Validator ref={titleValidatorRef}>
                                <Input
                                    type="text"
                                    value={eventAdd?.name}
                                    onChange={(value: string) => handleOnChange('name', value)}
                                    id="eventname"
                                    name="eventname"
                                    placeholder="Enter Title"
                                />
                            </Validator>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" className="pb-2">
                                Description <span className="text-danger">*</span>
                            </label>
                            <Validator ref={descriptionValidatorRef}>
                                <Input
                                    type="textarea"
                                    value={eventAdd?.description}
                                    onChange={(value: string) => handleOnChange('description', value)}
                                    id="eventdescription"
                                    name="eventdescription"
                                    placeholder="Enter Event Description"
                                />
                            </Validator>
                        </div>
                        <div
                            className={`w-100 d-flex flex-wrap components__addevent_picker ${
                                !isValidateStartDateTime || !isValidateEndDateTime ? 'components__addevent_picker_invalid' : ''
                            }`}
                        >
                            <Validator
                                className="bases__width-percent--40 components__addevent_picker_from"
                                ref={startDateTimeValidatorRef}
                            >
                                <DateTimePicker
                                    value={eventAdd?.day_start}
                                    onBlur={() => handleValidateStartDateTime()}
                                    onChange={(value: string) => handleOnChange('day_start', value)}
                                    maxDate={null}
                                    maxTime={null}
                                    classNameDate="components__addevent_picker-date"
                                    classNameTime="components__addevent_picker-time"
                                />
                            </Validator>
                            <span className="bases__padding--horizontal10 d-flex align-items-center bases__font--14 components__addevent_picker-center-text">
                                ~
                            </span>
                            <Validator className="bases__width-percent--40 components__addevent_picker_to" ref={endDateTimeValidatorRef}>
                                <DateTimePicker
                                    value={eventAdd?.day_end}
                                    onBlur={() => handleValidateEndDateTime()}
                                    onChange={(value: string) => handleOnChange('day_end', value)}
                                    minDate={null}
                                    minTime={null}
                                    classNameDate="components__addevent_picker-date"
                                    classNameTime="components__addevent_picker-time"
                                />
                            </Validator>
                        </div>
                    </div>
                    <div className="col-md-6 gap-4 d-flex flex-column ">
                        <div className="form-group">
                            <label htmlFor="location" className="pb-2">
                                Location<span className="text-danger">*</span>{' '}
                            </label>
                            <Validator ref={locationValidatorRef}>
                                <Input
                                    value={eventAdd?.location}
                                    type="text"
                                    onChange={(value: string) => handleOnChange('location', value)}
                                    id="location"
                                    name="location"
                                    placeholder="Enter Location"
                                />
                            </Validator>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ticketType" className="pb-2">
                                Ticket Type<span className="text-danger">*</span>{' '}
                            </label>
                            <Validator ref={ticketTypeValidatorRef}>
                                <Select
                                    value={eventAdd?.event_type}
                                    onChange={(value: string) => handleOnChange('event_type', value)}
                                    options={renderEventTypeOptions()}
                                />
                            </Validator>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ticketPrice" className="pb-2">
                                Ticket Price<span className="text-danger">*</span>{' '}
                            </label>
                            <Validator ref={ticketPriceValidatorRef}>
                                <Input
                                    value={eventAdd?.price}
                                    type="signed-number"
                                    onChange={(value: string) => handleOnChange('price', value)}
                                    id="ticketprice"
                                    name="ticketprice"
                                    placeholder="Enter Ticket Price"
                                    isBlockSpecial={true}
                                    maxLength={10}
                                />
                            </Validator>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ticketquantity" className="pb-2">
                                Ticket Quantity<span className="text-danger">*</span>{' '}
                            </label>
                            <Validator ref={ticketQuantityValidatorRef}>
                                <Select
                                    value={eventAdd?.ticket_number}
                                    onChange={(value: string) => handleOnChange('ticket_number', value)}
                                    options={renderEventTicketOptions()}
                                />
                            </Validator>
                        </div>
                        <div className="form-group">
                            <label htmlFor="banner" className="pb-2">
                                Banner<span className="text-danger">*</span>{' '}
                            </label>
                            <Validator ref={bannerValidatorRef}>
                                <input
                                    type="file"
                                    value={eventAdd?.image}
                                    onChange={(e) => handleOnChange('image', e.target.value)}
                                    id="event-image"
                                    name="event-image"
                                    accept="image/*"
                                    placeholder="Import event banner"
                                />
                            </Validator>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-row-reverse gap-2">
                    <Button buttonText="Submit" onClick={handleSubmit} background="green" fontSize="14" />
                    <Button buttonText="Cancel" onClick={hanldeCancelBack} fontSize="14" />
                </div>
            </div>
        </div>
    );
};

export default AddEventForm;
