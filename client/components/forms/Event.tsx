import { createRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Validator from '@components/commons/Validator';
import { validateHelper } from '@utils/helpers';

import Input from '@components/commons/Input';
import DateTimePicker from '@components/commons/DateTimePicker';
import { useDispatch } from 'react-redux';
import { fetchAddEvent, fetchUpdateEvent, fetchUploadImagesEvent } from '@redux/actions/api';
import { enums, http, images, routes } from '@utils/constants';
import Select from '@components/commons/Select';
import Button from '@components/commons/Button';
import Img from '@components/commons/Img';
import { setModal } from '@redux/actions';
import axios from 'axios';

const locations = [
    { name: 'Location A', image: 'https://phongvu.vn/cong-nghe/wp-content/uploads/2024/07/Cong-cu-AI-nen-dung-1024x640.jpg', areas: [30, 40, 50] },
    { name: 'Location B', image: '/path/to/imageB.png', areas: [35, 45] },
    { name: 'Location C', image: '/path/to/imageC.png', areas: [25, 45] },
    { name: 'ANOTHER', image: '', areas: [] },
];

const AddEventForm: IAddEventComponent<IAddEventComponentProps> = (props) => {
    const { event } = props;

    const dispatch = useDispatch();
    const router = useRouter();
    const { query } = router;
    const { id } = query;

    const [state, setState] = useState<IAddEventComponentState>(() => {
        let previewUrl = '';
        if (event?.images) {
            if (typeof event.images === 'string') {
                previewUrl = event.images;
            } else if (event.images instanceof FormData) {
                previewUrl = '';
            }
        }

        return {
            isValidateStartDateTime: true,
            isValidateEndDateTime: true,
            eventAdd: {
                ...(event ?? {}),
            },
            previewUrl,
            selectedLocationImage: '',
            selectedLocationAreas: [],
            ticketPrices: [],
            ticketQuantities: [],
        };
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { eventAdd, selectedLocationImage, selectedLocationAreas, ticketPrices, ticketQuantities, isValidateStartDateTime, isValidateEndDateTime, previewUrl } = state;

    const titleValidatorRef = createRef<IValidatorComponentHandle>();
    const descriptionValidatorRef = createRef<IValidatorComponentHandle>();
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
    /////////////////////////////////////////////////////////////////////////////////////
    const [errorMessages, setErrorMessages] = useState([]); // Thêm trạng thái lưu lỗi
    const [numberTicketType, setNumberTicketType] = useState(1);

    const handleLocationChange = (value) => {
        if (value === 'ANOTHER') {
            setState((prevState) => ({
                ...prevState,
                eventAdd: {
                    ...prevState.eventAdd,
                    location: value,
                },
                selectedLocationImage: '', // Không hiển thị ảnh
                selectedLocationAreas: Array(numberTicketType).fill(''), // Số lượng area dựa trên số lượng ticket type
                ticketPrices: Array(numberTicketType).fill(''),
                ticketQuantities: Array(numberTicketType).fill(''),
            }));
        } else {
            const selectedLocation = locations.find(location => location.name === value);
            setState((prevState) => ({
                ...prevState,
                eventAdd: {
                    ...prevState.eventAdd,
                    location: value,
                },
                selectedLocationImage: selectedLocation?.image ?? '',
                selectedLocationAreas: selectedLocation?.areas ?? [],
                ticketPrices: selectedLocation?.areas.map(() => ''),
                ticketQuantities: selectedLocation?.areas.map(() => ''),
            }));
        }
    };

    const handleTicketPriceChange = (index, value) => {
        const updatedPrices = [...ticketPrices];
        updatedPrices[index] = value;
        setState((prevState) => ({
            ...prevState,
            ticketPrices: updatedPrices,
        }));
    };

    const handleTicketQuantityChange = (index, value) => {
        const updatedQuantities = [...ticketQuantities];
        updatedQuantities[index] = value;

        const updatedErrors = [...errorMessages];
        if (parseInt(value, 10) > selectedLocationAreas[index]) {
            updatedErrors[index] = "Cannot select higher seat quantity";
        } else {
            updatedErrors[index] = "";
        }

        setErrorMessages(updatedErrors);
        setState((prevState) => ({
            ...prevState,
            ticketQuantities: updatedQuantities,
        }));
    };

    /////////////////////////////////////////////////////////////////////////////////////   
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
            previewUrl: typeof event?.images === 'string' ? event.images : prevState.previewUrl,
        }));
    }, [event]);

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setState((prev) => ({
                ...prev,
                previewUrl: URL.createObjectURL(file),
            }));
        }
    };

    const handleDeleteAvatar = () => {
        setSelectedFile(null);
        setState((prev) => ({
            ...prev,
            previewUrl: undefined,
        }));
    };

    const getCookie = (name: string): string | undefined => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop()?.split(';').shift();
        }
        return undefined;
    };

    const handleUploadImages = async (eventId: string, file: File) => {
        const formData = new FormData();
        formData.append('images', file);

        try {
            const token = getCookie('token');

            if (!token) {
                console.error('Token not found in cookies');
                return;
            }

            const res = await axios.put(`http://localhost:5000/api/event/upload-image/${eventId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data?.code === http.SUCCESS_CODE) {
                const upload = res.data.data?.userData?.images;
                setState((prev) => ({
                    ...prev,
                    eventAdd: {
                        ...prev.eventAdd,
                        images: upload,
                    },
                }));

                // Show success modal
                dispatch(
                    setModal({
                        isShow: true,
                        content: (
                            <>
                                <div className="text-center bases__margin--bottom31">
                                    <Img src={images.ICON_SUCCESS} className="bases__width--90 bases__height--75" />
                                </div>
                                <div className="bases__text--bold bases__font--14 text-center">Create New Event Successfully</div>
                            </>
                        ),
                    }),
                );
            } else {
                dispatch(
                    setModal({
                        isShow: true,
                        content: (
                            <>
                                <div className="text-center bases__margin--bottom31">
                                    <Img src={images.ICON_TIMES} className="bases__width--90 bases__height--75" />
                                </div>
                                <div className="bases__text--bold bases__font--14 text-center">Error while you upload image!!!</div>
                            </>
                        ),
                    }),
                );
            }
        } catch (error) {
            console.error('Error during image upload', error);
            dispatch(
                setModal({
                    isShow: true,
                    content: (
                        <>
                            <div className="text-center bases__margin--bottom31">
                                <Img src={images.ICON_TIMES} className="bases__width--90 bases__height--75" />
                            </div>
                            <div className="bases__text--bold bases__font--14 text-center">Error while you upload image!!!</div>
                        </>
                    ),
                }),
            );
        }
    };
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

    const handleSubmitAddEvent = async (): Promise<string | null> => {
        const res: IEventDataApiRes | IErrorAPIRes | null = await dispatch(fetchAddEvent(eventAdd ?? {}));

        if (res?.code === http.SUCCESS_CODE) {
            const eventId = res.result?._id ?? null;

            if (eventId) {
                router.push(routes.CLIENT.ORGANIZER_LIST_EVENT.href, undefined, { scroll: false });
            }
            return eventId;
        } else if (res?.code === http.ERROR_EXCEPTION_CODE) {
            alert(res?.mes);
            return null;
        } else {
            return null;
        }
    };

    const handleSubmit = async () => {
        let isValidate = true;

        const validator = [
            { ref: titleValidatorRef, value: eventAdd?.name, message: 'Title Is Not Empty!' },
            { ref: descriptionValidatorRef, value: eventAdd?.description, message: 'Description Is Not Empty!' },
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
                if (id && selectedFile) {
                    await handleUploadImages(id?.toString() ?? '', selectedFile);
                }
            } else {
                const eventId = await handleSubmitAddEvent();
                if (eventId && selectedFile) {
                    await handleUploadImages(eventId, selectedFile);
                }
            }
        }
    };
    return (
        <div className="components__addevent">
            <div className="components__addevent-form p-3">
                <div className="row">
                    <div className="col-md-6 gap-4 d-flex flex-column">
                        <div className="form-group">
                            <label htmlFor="title" className="pb-2">
                                Title <span className="text-danger">*</span>
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
                            <label htmlFor="ticketType" className="pb-2">
                                Ticket Type<span className="text-danger">*</span>
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
                        <div className="form-group">
                            <label htmlFor="location" className="pb-2">
                                Day Start<span className="text-danger"></span>
                            </label>
                            <div
                                className={`w-100 d-flex flex-wrap components__addevent_picker ${!isValidateStartDateTime || !isValidateEndDateTime ? 'components__addevent_picker_invalid' : ''
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

                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="location" className="pb-2">
                                Day End<span className="text-danger"></span>
                            </label>
                            <div
                                className={`w-100 d-flex flex-wrap components__addevent_picker ${!isValidateStartDateTime || !isValidateEndDateTime ? 'components__addevent_picker_invalid' : ''
                                    }`}
                            >
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
                        <div className="form-group">
                            <label htmlFor="description" className="pb-2">
                                Avatar <span className="text-danger">*</span>
                            </label>
                            <div className="form-group d-flex justify-content-center align-items-center col-md-12">
                                {!previewUrl && (
                                    <label
                                        htmlFor="avatar"
                                        style={{ cursor: 'pointer', padding: '70px', border: '1px solid #ffbdbd', borderRadius: '10px' }}
                                    >
                                        <img src={images.ICON_FILE_UPLOAD} alt="" />
                                    </label>
                                )}
                                <div className="d-flex align-items-center">
                                    <input
                                        type="file"
                                        className="form-control d-none"
                                        id="avatar"
                                        name="avatar"
                                        onChange={handleAvatarChange}
                                    />
                                    {previewUrl && (
                                        <div className="ms-3 position-relative">
                                            <img
                                                src={previewUrl}
                                                alt="Avatar"
                                                className="img-thumbnail"
                                                style={{ width: '1050px', height: 'auto', objectFit: 'cover' }}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                                onClick={handleDeleteAvatar}
                                            >
                                                X
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 gap-4 d-flex flex-column">
                        <div className="form-group">
                            <label htmlFor="location" className="pb-2">
                                Location<span className="text-danger">*</span>
                            </label>
                            <Validator>
                                <Select
                                    value={eventAdd?.location}
                                    onChange={handleLocationChange}
                                    options={locations.map(loc => ({ value: loc.name, label: loc.name }))}
                                />
                            </Validator>
                        </div>
                        {eventAdd?.location === 'ANOTHER' && (
                            <div className="form-group">
                                <label htmlFor="numberTicketType" className="pb-2">
                                    Number Ticket type <span className="text-danger">*</span> (Max: 3)
                                </label>
                                <Select
                                    value={numberTicketType}
                                    onChange={(value) => {
                                        const num = parseInt(value, 10); // Chọn số từ danh sách
                                        setNumberTicketType(num);
                                        setState((prevState) => ({
                                            ...prevState,
                                            selectedLocationAreas: Array(num).fill(''), // Cập nhật số lượng area dựa trên lựa chọn
                                            ticketPrices: Array(num).fill(''),
                                            ticketQuantities: Array(num).fill(''),
                                        }));
                                    }}
                                    options={[ // Danh sách các tùy chọn từ 1 đến 3
                                        { value: 1, label: '1' },
                                        { value: 2, label: '2' },
                                        { value: 3, label: '3' },
                                    ]}
                                    id="numberTicketType"
                                    name="numberTicketType"
                                />
                            </div>
                        )}
                        {eventAdd?.location === 'ANOTHER' ? (
                            <div className="form-group">
                                <label htmlFor="anotherImage" className="pb-2">
                                    Upload Seat Map Image <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="anotherImage"
                                    name="anotherImage"
                                    onChange={handleAvatarChange}
                                />
                            </div>
                        ) : selectedLocationImage && (
                            <div className="components__addevent-location-image">
                                <img src={selectedLocationImage} alt="Selected Location" className="img-thumbnail" />
                            </div>
                        )}
                        {selectedLocationAreas.length > 0 && (
                            <div className="components__addevent-ticket-grid">
                                {/* Ticket Price */}
                                <div className="components__addevent-ticket-grid-row">
                                    <label htmlFor="location" className="pb-2">
                                        Ticket Price<span className="text-danger">*</span>
                                    </label>
                                    <div className="components__addevent-ticket-grid-row-items">
                                        {selectedLocationAreas.map((_, index) => (
                                            <div key={index} className="components__addevent-ticket-grid-row-items-item">
                                                <label>Area {index + 1}</label>
                                                <Input
                                                    value={ticketPrices[index]}
                                                    type="signed-number"
                                                    onChange={(value) => handleTicketPriceChange(index, value)}
                                                    id={`ticketPriceArea${index}`}
                                                    name={`ticketPriceArea${index}`}
                                                    placeholder={`Enter Price`}
                                                    isBlockSpecial={true}
                                                    maxLength={10}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Ticket Quantity */}
                                <div className="components__addevent-ticket-grid-row">
                                    <label htmlFor="location" className="pb-2">
                                        Ticket Quantity<span className="text-danger">*</span>
                                    </label>
                                    <div className="components__addevent-ticket-grid-row-items">
                                        {selectedLocationAreas.map((_, index) => (
                                            <div key={index} className="components__addevent-ticket-grid-row-items-item">
                                                <label>Area {index + 1}</label>
                                                <Input
                                                    value={ticketQuantities[index]}
                                                    type="signed-number"
                                                    onChange={(value) => handleTicketQuantityChange(index, value)}
                                                    id={`ticketQuantityArea${index}`}
                                                    name={`ticketQuantityArea${index}`}
                                                    placeholder={`Enter Quantity`}
                                                    isBlockSpecial={true}
                                                    maxLength={10}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
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
