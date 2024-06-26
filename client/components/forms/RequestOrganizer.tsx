import { createRef, useState, useEffect, ChangeEvent } from 'react';
import Validator from '@components/commons/Validator';
import { validateHelper } from '@utils/helpers';
import { enums, routes } from '@utils/constants';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequestOrganizer, fetchCheckOrganizerStatus } from '@redux/actions';
import { ReduxStates } from '@redux/reducers';
import React from 'react';

const RequestOrganizerForm: IRequestOrganizerComponent<IRequestOrganizerComponentProps> = () => {
    const navigate = useRouter();
    const dispatch = useDispatch();
    const { profile, organizerStatus } = useSelector((states: ReduxStates) => states);
    const [state, setState] = useState<IRequestOrganizerComponentState>({
        organizationName: profile?.organizationName || '',
        description: profile?.description || '',
        contactEmail: profile?.contactEmail || '',
        contactPhone: profile?.contactPhone || '',
        status: profile?.status || '',
        Image: profile?.Image || '',
    });

    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList as never[]);
    };

    useEffect(() => {
        if (organizerStatus) {
            setState((prevState) => ({
                ...prevState,
                status: organizerStatus,
            }));
        }
    }, [organizerStatus]);

    const { organizationName, description, contactEmail, contactPhone, status, Image } = state;

    const organizationNameValidatorRef = createRef<Validator>();
    const descriptionValidatorRef = createRef<Validator>();
    const contactEmailValidatorRef = createRef<Validator>();
    const contactPhoneValidatorRef = createRef<Validator>();

    const handleOnChange = (field: string, value: string | null) => {
        setState((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Get the file URL
            const ImageUrl = URL.createObjectURL(file);
            // Update state with the Image URL
            setState((prev) => ({
                ...prev,
                Image: ImageUrl,
            }));
        }
    };

    const handleDeleteImage = () => {
        setState((prev) => ({
            ...prev,
            Image: '', // Reset the Image URL
        }));
    };

    const submitForm = async () => {
        let isValidate = true;

        const validatorText = [
            { ref: organizationNameValidatorRef, value: organizationName, message: 'Organization Name Is Not Empty!' },
            { ref: descriptionValidatorRef, value: description, message: 'Description Is Not Empty!' },
            { ref: contactEmailValidatorRef, value: contactEmail, message: 'Contact Email Is Not Empty!' },
            { ref: contactPhoneValidatorRef, value: contactPhone, message: 'Contact Phone Is Not Empty!' },
        ];

        validatorText.forEach(({ ref, value, message }) => {
            ref.current?.onValidateMessage('');
            if (validateHelper.isEmpty(value as string)) {
                ref.current?.onValidateMessage(message);
                isValidate = false;
            } else if (validateHelper.isCharacters(value as string)) {
                ref.current?.onValidateMessage(`Your ${message} Cannot Be Less Than 2 Characters`);
                isValidate = false;
            }
        });

        if (isValidate) {
            dispatch(
                await fetchRequestOrganizer({ organizationName, description, contactEmail, contactPhone }, (res) => {
                    if (res?.code === 200) {
                        navigate.push(routes.CLIENT.HOME_PAGE.href);
                    } else if (res?.code === 500) {
                        alert(res?.mes);
                    }
                }),
            );
        }
    };

    return (
        <div className="components___requestorganizer">
            <div className="components___requestorganizer-form p-3">
                <h2 className="fw-bold mb-4 text-center">Request to be an Organizer</h2>
                <div className="row">
                    <div className="col-md-6 gap-4 d-flex flex-column">
                        <div className="form-group">
                            <label htmlFor="organizationName" className="pb-2">
                                Organization Name
                                <span className="text-danger">*</span>
                            </label>
                            <Validator ref={organizationNameValidatorRef}>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="organizationName"
                                    value={organizationName}
                                    onChange={(e) => handleOnChange('organizationName', e.target.value)}
                                    name="organizationName"
                                    placeholder="Enter Your Organization Name"
                                />
                            </Validator>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" className="pb-2">
                                Description
                                <span className="text-danger">*</span>
                            </label>
                            <Validator ref={descriptionValidatorRef}>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    value={description}
                                    onChange={(e) => handleOnChange('description', e.target.value)}
                                    name="description"
                                    placeholder="Enter Description of Your Organization"
                                />
                            </Validator>
                        </div>
                    </div>
                    <div className="col-md-6 gap-4 d-flex flex-column">
                        <div className="form-group">
                            <label htmlFor="contactEmail" className="pb-2">
                                Contact Email
                                <span className="text-danger">*</span>
                            </label>
                            <Validator ref={contactEmailValidatorRef}>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="contactEmail"
                                    value={contactEmail}
                                    onChange={(e) => handleOnChange('contactEmail', e.target.value)}
                                    name="contactEmail"
                                    placeholder="Enter Contact Email"
                                />
                            </Validator>
                        </div>
                        <div className="form-group">
                            <label htmlFor="contactPhone" className="pb-2">
                                Contact Phone
                                <span className="text-danger">*</span>
                            </label>
                            <Validator ref={contactPhoneValidatorRef}>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="contactPhone"
                                    value={contactPhone}
                                    onChange={(e) => handleOnChange('contactPhone', e.target.value)}
                                    name="contactPhone"
                                    placeholder="Enter Contact Phone"
                                />
                            </Validator>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Image" className="pb-2">
                                Image
                            </label>
                            <div className="d-flex align-items-center">
                                <input type="file" className="form-control" id="Image" name="Image" onChange={handleImageChange} />
                                {Image && ( // Display only if Image is available
                                    <div className="ms-3">
                                        <img
                                            src={Image}
                                            alt="Image"
                                            className="img-thumbnail"
                                            style={{ width: '100px', height: '100px' }}
                                        />
                                        <button type="button" className="btn btn-danger mt-2" onClick={handleDeleteImage}>
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {status && (
                    <div className="mt-4">
                        <h5 className="text-center">Request Status: {status}</h5>
                    </div>
                )}
                <div className="d-flex justify-content-end pt-4">
                    <button type="button" onClick={submitForm} className="components___requestorganizer-form-firstButton">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RequestOrganizerForm;
