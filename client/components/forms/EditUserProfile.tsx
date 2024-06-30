import { createRef, useState, useEffect } from 'react';
import Validator from '@components/commons/Validator';
import { validateHelper } from '@utils/helpers';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { fetchEditUserProfile } from '@redux/actions';
import Input from '@components/commons/Input';
import { http, routes } from '@utils/constants';

const EditUserProFileForm: IEditUserProfileComponent<IEditUserProfileComponentProps> = (props) => {
    const { currentUser } = props;
    const dispatch = useDispatch();
    const router = useRouter();

    const [state, setState] = useState<IEditUserProfileComponentState>({
        curentProfile: {
            ...currentUser,
        },
    });

    const { curentProfile } = state;

    const firstNameValidatorRef = createRef<IValidatorComponentHandle>();
    const dobValidatorRef = createRef<IValidatorComponentHandle>();
    const genderValidatorRef = createRef<IValidatorComponentHandle>();
    const phoneValidatorRef = createRef<IValidatorComponentHandle>();
    const addressValidatorRef = createRef<IValidatorComponentHandle>();

    const handleAvatarChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setState((prev) => ({
                ...prev,
                avatar: URL.createObjectURL(file),
            }));
        }
    };

    const handleDeleteAvatar = () => {
        setState((prev) => ({
            ...prev,
            avatar: null,
        }));
    };

    const handleOnChange = (field: string, value: string | null) => {
        setState((prev) => ({
            ...prev,
            curentProfile: {
                ...prev.curentProfile,
                [field]: value,
            },
        }));
    };

    const submitForm = async () => {
        let isValidate = true;

        const validatorText = [
            { ref: firstNameValidatorRef, value: curentProfile?.username, message: 'Your First Name Is Not Empty!' },
            { ref: dobValidatorRef, value: curentProfile?.dob, message: 'Your Date of Birth Is Not Empty!' },
            { ref: genderValidatorRef, value: curentProfile?.gender, message: 'Your Gender Is Not Empty!' },
            { ref: phoneValidatorRef, value: curentProfile?.phone, message: 'Your Phone Is Not Empty!' },
            { ref: addressValidatorRef, value: curentProfile?.address, message: 'Your Address Is Not Empty!' },
        ];

        validatorText.forEach(({ ref, value, message }) => {
            ref.current?.onValidateMessage('');
            if (validateHelper.isEmpty(value ?? '')) {
                ref.current?.onValidateMessage(message);
                isValidate = false;
            } else if (validateHelper.isCharacters(value ?? '')) {
                ref.current?.onValidateMessage(`Your ${message} Cannot Be Less Than 2 Characters`);
                isValidate = false;
            }
        });

        if (isValidate) {
            dispatch(
                await fetchEditUserProfile(curentProfile ?? {}, (result: IEditUserProfileAPIRes | IErrorAPIRes | null) => {
                    setState((prevState) => ({
                        ...prevState,
                    }));
                    if (result && result.code === http.SUCCESS_CODE) {
                        router.push(routes.CLIENT.HOME_PAGE.href, undefined, { scroll: false });
                    }
                }),
            );
        }
    };

    return (
        <div className="components___edituserprofile">
            <div className="components___edituserprofile-form p-3">
                <h2 className="fw-bold mb-4 text-center">Edit Profile</h2>
                <div className="row">
                    <div className="col-md-6 gap-4 d-flex flex-column">
                        <div className="form-group">
                            <label htmlFor="firstname" className="pb-2">
                                User Name
                                <span className="text-danger">*</span>
                            </label>
                            <Validator ref={firstNameValidatorRef}>
                                <Input
                                    type="text"
                                    id="firstname"
                                    value={curentProfile?.username}
                                    onChange={(value: string) => handleOnChange('username', value)}
                                    name="firstname"
                                    placeholder="Enter Your First Name"
                                    isBlockSpecial={true}
                                />
                            </Validator>
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender" className="pb-2">
                                Gender
                                <span className="text-danger">*</span>
                            </label>
                            <Validator ref={genderValidatorRef}>
                                <select
                                    value={curentProfile?.gender}
                                    onChange={(e) => handleOnChange('gender', e.target.value)}
                                    className="form-control"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </Validator>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone_number" className="pb-2">
                                Phone Number
                                <span className="text-danger">*</span>
                            </label>
                            <Validator ref={phoneValidatorRef}>
                                <Input
                                    type="signed-number"
                                    className="form-control"
                                    maxLength={10}
                                    id="phone_number"
                                    name="phone_number"
                                    value={curentProfile?.phone}
                                    onChange={(value: string) => handleOnChange('phone', value)}
                                    placeholder="Enter Your Phone Number"
                                />
                            </Validator>
                        </div>
                    </div>
                    <div className="col-md-6 gap-4 d-flex flex-column">
                        <div className="form-group">
                            <label htmlFor="dob" className="pb-2">
                                Date Of Birth
                                <span className="text-danger">*</span>
                            </label>
                            <Validator ref={dobValidatorRef}>
                                <input
                                    value={curentProfile?.dob}
                                    onChange={(e) => handleOnChange('dob', e.target.value)}
                                    type="date"
                                    className="form-control"
                                    name="dob"
                                />
                            </Validator>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address" className="pb-2">
                                Address
                                <span className="text-danger">*</span>
                            </label>
                            <Validator ref={addressValidatorRef}>
                                <Input
                                    type="text"
                                    className="form-control"
                                    maxLength={100}
                                    id="address"
                                    value={curentProfile?.address}
                                    onChange={(value: string) => handleOnChange('address', value)}
                                    name="address"
                                    placeholder="Enter Your Address"
                                    isBlockSpecial={true}
                                />
                            </Validator>
                        </div>
                        <div className="form-group">
                            <label htmlFor="avatar" className="pb-2">
                                Avatar
                            </label>
                            <div className="d-flex align-items-center">
                                <input type="file" className="form-control" id="avatar" name="avatar" onChange={handleAvatarChange} />
                                {curentProfile?.images && (
                                    <div className="ms-3">
                                        <img
                                            src={curentProfile?.images}
                                            alt="Avatar"
                                            className="img-thumbnail"
                                            style={{ width: '100px', height: '100px' }}
                                        />
                                        <button type="button" className="btn btn-danger mt-2" onClick={handleDeleteAvatar}>
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-end pt-4">
                    <button type="button" onClick={submitForm} className="components___edituserprofile-form-firstButton">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditUserProFileForm;
