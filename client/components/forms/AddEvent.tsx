import { createRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { routes } from '@utils/constants';
import { useRouter } from 'next/router';
import Validator from '@components/commons/Validator';
import { validateHelper } from '@utils/helpers';

const AddEventForm: IAddEventComponent<IAddEventComponentProps> = () => {
    // const dispatch = useDispatch();
    const router = useRouter();
    const dispatch = useDispatch();
    const navigate = useRouter();

    const [state, setState] = useState<IAddEventComponentState>({
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
        saleStartDate: '',
        saleEndDate: '',
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
        saleStartDate,
        saleEndDate,
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
    const saleStartDateValidatorRef = createRef<IValidatorComponentHandle>();
    const saleEndDateValidatorRef = createRef<IValidatorComponentHandle>();

    const handleOnChange = (feild: string, value: string | null) => {
        setState((prev) => ({
            ...prev,
            [feild]: value,
        }));
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
            { ref: saleStartDateValidatorRef, value: saleStartDate, message: 'Sale Start Date Is Not Empty!' },
            { ref: saleEndDateValidatorRef, value: saleEndDate, message: 'Sale End Date Is Not Empty!' },
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
                                {' '}
                                Title <span className="text-danger">*</span>{' '}
                            </label>
                            <Validator ref={titleValidatorRef}>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => handleOnChange('title', e.target.value)}
                                    className="form-control"
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
                                <textarea
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => handleOnChange('description', e.target.value)}
                                    id="eventdescription"
                                    name="eventdescription"
                                    placeholder="Enter Event Description"
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
                        <div className="form-group">
                            <label htmlFor="startDate" className="pb-2">
                                {' '}
                                Date Of Start <span className="text-danger">*</span>
                            </label>
                            <Validator ref={startDateValidatorRef}>
                                <input
                                    value={startDate}
                                    type="date"
                                    onChange={(e) => handleOnChange('dos', e.target.value)}
                                    className="form-control"
                                    id="dos"
                                    name="pdos"
                                />
                            </Validator>
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate" className="pb-2">
                                Date Of End<span className="text-danger">*</span>
                            </label>
                            <Validator ref={endDateValidatorRef}>
                                <input
                                    value={endDate}
                                    type="date"
                                    onChange={(e) => handleOnChange('doe', e.target.value)}
                                    className="form-control"
                                    id="doe"
                                    name="pdoe"
                                />
                            </Validator>
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate" className="pb-2">
                                supportContact<span className="text-danger">*</span>
                            </label>
                            <Validator ref={supportContactValidatorRef}>
                                <input
                                    value={endDate}
                                    type="supportContact"
                                    onChange={(e) => handleOnChange('supportContact', e.target.value)}
                                    className="form-control"
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
                                <input
                                    value={location}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => handleOnChange('location', e.target.value)}
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
                                <input
                                    value={ticketType}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => handleOnChange('ticketType', e.target.value)}
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
                                <input
                                    value={ticketPrice}
                                    type="text"
                                    onChange={(e) => handleOnChange('ticketPrice', e.target.value)}
                                    id="ticketprice"
                                    name="ticketprice"
                                    className="form-control"
                                    placeholder="Enter Ticket Price"
                                />
                            </Validator>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ticketquantity" className="pb-2">
                                Ticket Quantity<span className="text-danger">*</span>{' '}
                            </label>
                            <Validator ref={ticketQuantityValidatorRef}>
                                <input
                                    value={ticketQuantity}
                                    type="number"
                                    onChange={(e) => handleOnChange('ticketQuantity', e.target.value)}
                                    className="form-control"
                                    id="ticketprice"
                                    name="ticketprice"
                                />
                            </Validator>
                        </div>
                        <div className="form-group">
                            <label htmlFor="saleStartDate" className="pb-2">
                                Sale Start Date<span className="text-danger">*</span>{' '}
                            </label>
                            <Validator ref={saleStartDateValidatorRef}>
                                <input
                                    value={saleStartDate}
                                    type="date"
                                    className="form-control"
                                    onChange={(e) => handleOnChange('saleStartDate', e.target.value)}
                                    id="salestartdate"
                                    name="salestartdate"
                                />
                            </Validator>
                        </div>
                        <div className="form-group">
                            <label htmlFor="saleEndDate" className="pb-2">
                                Sale End Date<span className="text-danger">*</span>{' '}
                            </label>
                            <Validator ref={saleEndDateValidatorRef}>
                                <input
                                    value={saleEndDate}
                                    type="date"
                                    className="form-control"
                                    onChange={(e) => handleOnChange('saleEndDate', e.target.value)}
                                    id="saleenddate"
                                    name="saleenddate"
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
                        onClick={() => handleSubmit()}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEventForm;
