import { createRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Validator from '@components/commons/Validator';
import { dateHelper, validateHelper } from '@utils/helpers';

import Input from '@components/commons/Input';
import DateTimePicker from '@components/commons/DateTimePicker';

const AddEventForm: IAddEventComponent<IAddEventComponentProps> = () => {
    // const dispatch = useDispatch();
    const router = useRouter();

    const [state, setState] = useState<IAddEventComponentState>({
        isValidateStartDateTime: true,
        isValidateEndDateTime: true,
        title: '',
        description: '',
        banner: '',
        startDate: '',
        endDate: '',
        location: '',
        ticketType: '',
        ticketPrice: '',
        ticketQuantity: '',
        supportContact: '',
    });
    const {
        title,
        description,
        banner,
        startDate,
        endDate,
        location,
        ticketType,
        ticketPrice,
        ticketQuantity,
        supportContact,
        isValidateStartDateTime,
        isValidateEndDateTime,
    } = state;

    const titleValidatorRef = createRef<IValidatorComponentHandle>();
    const descriptionValidatorRef = createRef<IValidatorComponentHandle>();
    const bannerValidatorRef = createRef<IValidatorComponentHandle>();
    const startDateValidatorRef = createRef<IValidatorComponentHandle>();
    const endDateValidatorRef = createRef<IValidatorComponentHandle>();
    const locationValidatorRef = createRef<IValidatorComponentHandle>();
    const ticketTypeValidatorRef = createRef<IValidatorComponentHandle>();
    const ticketPriceValidatorRef = createRef<IValidatorComponentHandle>();
    const ticketQuantityValidatorRef = createRef<IValidatorComponentHandle>();
    const supportContactValidatorRef = createRef<IValidatorComponentHandle>();
    const startDateTimeValidatorRef = createRef<IValidatorComponentHandle>();
    const endDateTimeValidatorRef = createRef<IValidatorComponentHandle>();

    const handleOnChange = (feild: string, value: string | null) => {
        setState((prev) => ({
            ...prev,
            [feild]: value,
        }));
    };

    useEffect(() => {
        const handleBeforeUnload = () => {
            setState({
                title: '',
                description: '',
                banner: '',
                startDate: '',
                endDate: '',
                location: '',
                ticketType: '',
                ticketPrice: '',
                ticketQuantity: '',
                supportContact: '',
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

    const handleValidateStartDateTime = () => {
        handleSetValidateDateTime(true);
        if (startDate && !validateHelper.isDate(startDate)) {
            handleSetValidateDateTime(false);
        }
    };

    const handleValidateEndDateTime = () => {
        handleSetValidateDateTime(true, 'end');
        endDateTimeValidatorRef?.current?.onValidateMessage('');

        if (endDate && !validateHelper.isDate(endDate)) {
            handleSetValidateDateTime(false, 'end');
        }
    };

    const handleSubmit = async () => {
        let isValidate = true;

        const validator = [
            { ref: titleValidatorRef, value: title, message: 'Title Is Not Empty!' },
            { ref: descriptionValidatorRef, value: description, message: 'Description Is Not Empty!' },
            { ref: bannerValidatorRef, value: banner, message: 'Banner Is Not Empty!' },
            { ref: startDateValidatorRef, value: startDate, message: 'Start Date Is Not Empty!' },
            { ref: endDateValidatorRef, value: endDate, message: 'End Date Is Not Empty!' },
            { ref: locationValidatorRef, value: location, message: 'Location Is Not Empty!' },
            { ref: ticketTypeValidatorRef, value: ticketType, message: 'TicketType Is Not Empty!' },
            { ref: ticketPriceValidatorRef, value: ticketPrice, message: 'Ticket Price Is Not Empty!' },
            { ref: ticketQuantityValidatorRef, value: ticketQuantity, message: 'Ticket Quantity Is Not Empty!' },
            { ref: supportContactValidatorRef, value: supportContact, message: 'Support Contact Is Not Empty!' },
        ];

        validator.forEach(({ ref, value, message }) => {
            ref.current?.onValidateMessage('');
            if (validateHelper.isEmpty(value ?? '')) {
                ref.current?.onValidateMessage(message);
                isValidate = false;
            } else if (validateHelper.isCharacters(value ?? '')) {
                ref.current?.onValidateMessage(`Your ${message} Cannot Be Less Than 2 Characters`);
                isValidate = false;
            }
        });
        // if (isValidate) {
        //     // Logic để submit form
        //     console.log('Form submitted', state);
        // }
    };

    return (
        <div className="components__addevent ">
            <div className="components__addevent-form p-3">
                <h2 className="fw-bold mb-4 text-center">Add Event</h2>
                <div className="row">
                    <div className="col-md-6 gap-4 d-flex flex-column ">
                        <div className="form-group">
                            <label htmlFor="title" className="pb-2">
                                Title <span className="text-danger">*</span>{' '}
                            </label>
                            <Validator ref={titleValidatorRef}>
                                <Input
                                    type="text"
                                    value={title}
                                    onChange={(value: string) => handleOnChange('title', value)}
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
                                    value={description}
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
                                    value={startDate ?? ''}
                                    onBlur={() => handleValidateStartDateTime()}
                                    onChange={(value: string) => handleOnChange('start-date', value)}
                                    maxDate={
                                        startDate
                                            ? dateHelper.formatToDate(startDate, 'YYYY-MM-DD HH:mm:ss')
                                            : dateHelper.formatToDate(dateHelper.getUTCStringNow(), 'YYYY-MM-DD HH:mm:ss')
                                    }
                                    maxTime={
                                        startDate &&
                                        validateHelper.isDateTime(startDate) &&
                                        dateHelper.compareDateSame(startDate ?? '', endDate ?? '', 'YYYY-MM-DD')
                                            ? dateHelper.formatToDate(startDate, 'YYYY-MM-DD HH:mm:ss')
                                            : null
                                    }
                                    classNameDate="components__addevent_picker-date"
                                    classNameTime="components__addevent_picker-time"
                                />
                            </Validator>
                            <span className="bases__padding--horizontal10 d-flex align-items-center bases__font--14 components__addevent_picker-center-text">
                                ~
                            </span>
                            <Validator className="bases__width-percent--40 components__addevent_picker_to" ref={endDateTimeValidatorRef}>
                                <DateTimePicker
                                    value={endDate ?? ''}
                                    onBlur={() => handleValidateEndDateTime()}
                                    onChange={(value: string) => handleOnChange('export_datetime_to', value)}
                                    minDate={startDate ? dateHelper.formatToDate(startDate, 'YYYY-MM-DD HH:mm:ss') : null}
                                    minTime={
                                        startDate &&
                                        validateHelper.isDateTime(startDate) &&
                                        dateHelper.compareDateSame(startDate ?? '', endDate ?? '', 'YYYY-MM-DD')
                                            ? dateHelper.formatToDate(startDate, 'YYYY-MM-DD HH:mm:ss')
                                            : null
                                    }
                                    classNameDate="components__addevent_picker-date"
                                    classNameTime="components__addevent_picker-time"
                                />
                            </Validator>
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate" className="pb-2">
                                supportContact<span className="text-danger">*</span>
                            </label>
                            <Validator ref={supportContactValidatorRef}>
                                <Input
                                    value={endDate}
                                    type="textarea"
                                    onChange={(value: string) => handleOnChange('supportContact', value)}
                                    id="supportContact"
                                    name="supportContact"
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
                                    value={location}
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
                                <Input
                                    value={ticketType}
                                    type="text"
                                    onChange={(value: string) => handleOnChange('ticketType', value)}
                                    id="tickettype"
                                    name="tickettype"
                                    placeholder="Enter Ticket Type"
                                />
                            </Validator>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ticketPrice" className="pb-2">
                                Ticket Price<span className="text-danger">*</span>{' '}
                            </label>
                            <Validator ref={ticketPriceValidatorRef}>
                                <Input
                                    value={ticketPrice}
                                    type="text"
                                    onChange={(value: string) => handleOnChange('ticketPrice', value)}
                                    id="ticketprice"
                                    name="ticketprice"
                                    placeholder="Enter Ticket Price"
                                />
                            </Validator>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ticketquantity" className="pb-2">
                                Ticket Quantity<span className="text-danger">*</span>{' '}
                            </label>
                            <Validator ref={ticketQuantityValidatorRef}>
                                <Input
                                    value={ticketQuantity}
                                    type="number"
                                    onChange={(value: string) => handleOnChange('ticketQuantity', value)}
                                    id="ticketprice"
                                    name="ticketprice"
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
                                    value={banner}
                                    onChange={(e) => handleOnChange('banner', e.target.value)}
                                    id="event-image"
                                    name="event-image"
                                    accept="image/*"
                                    placeholder="Import event banner"
                                />
                            </Validator>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-row-reverse ">
                    <button type="submit" className="btn btn-success btn-block mx-2 px-5 py-3" onClick={() => handleSubmit()}>
                        Submit
                    </button>
                    <button
                        type="button"
                        className="components__addevent-form-secondbutton btn btn-secondary btn-block text-success mx-2 px-5 py-3"
                        onClick={() => hanldeCancelBack()}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEventForm;
