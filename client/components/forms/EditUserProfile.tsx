import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { createRef, useState } from 'react';
import Validator from '@components/commons/Validator';
import { validateHelper } from '@utils/helpers';
import { enums, routes } from '@utils/constants';
import router, { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEditUserProfile } from '@redux/actions';
import { ReduxStates } from '@redux/reducers';

const EditUserProFileForm: IEditUserProfileComponent<IEditUserProfileComponentProps> = () => {
    const navigate = useRouter();
    const dispatch = useDispatch();

    const [state, setState] = useState<IEditUserProfileComponentState>({
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        phone : '',
        address: '',
    });
    const handleNextPage = () => {
        navigate.push(routes.CLIENT.HOME_PAGE.href);
    };
    const { firstName, lastName, dob, gender, phone, address } = state;

    const firstNameValidatorRef = createRef<IValidatorComponentHandle>();
    const lastNameValidatorRef = createRef<IValidatorComponentHandle>();
    const dobValidatorRef = createRef<IValidatorComponentHandle>();
    const genderValidatorRef = createRef<IValidatorComponentHandle>();
    const phoneValidatorRef = createRef<IValidatorComponentHandle>();
    const addressValidatorRef = createRef<IValidatorComponentHandle>();

    const handleOnChange = (feild: string, value: string | null) => {
        setState((prev) => ({
            ...prev,
            [feild]: value,
        }));
    };    

    const submitForm = async () => {
        let isValidate = true;

        const validatorText = [
            { ref: firstNameValidatorRef, value: firstName, message: 'Your First Name Is Not Empty!' },
            { ref: lastNameValidatorRef, value: lastName, message: 'Your Last Name Is Not Empty!' },
            { ref: dobValidatorRef, value: dob, message: 'Your Date of Birth Is Not Empty!' },
            { ref: genderValidatorRef, value: gender, message: 'Your Gender Is Not Empty!' },
            { ref: phoneValidatorRef, value: phone, message: 'Your Phone Is Not Empty!' },
            { ref: addressValidatorRef, value: address, message: 'Your Address Is Not Empty!' },
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

        // call api
        if (isValidate) {
            dispatch(
                await fetchEditUserProfile({ firstName, lastName, dob, gender, phone, address }, (res) => {
                    const isAdmin = res?.data?.userData?.role;
                    console.log(isAdmin);
                    if (res?.code == 200) {
                        if (isAdmin.includes(enums?.ROLE?.ADMIN)) {
                            router.push(routes.CLIENT.ADMIN_PAGE.href);
                        } else {
                            router.push(routes.CLIENT.HOME_PAGE.href);
                        }
                    } else if (res?.code == 500) {
                        alert(res?.mes);
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
                    <div className="col-md-6 gap-4 d-flex flex-column ">
                        <div className="form-group">     
                            <label htmlFor="firstname" className="pb-2">
                                First Name
                                <span className="text-danger">*</span>
                            </label>
                            <Validator ref={firstNameValidatorRef}>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstname"
                                    value={firstName}
                                    onChange={(e) => handleOnChange('firstname', e.target.value)}
                                    name="firstname"
                                    placeholder="Enter Your First Name"
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
                                    value={gender}
                                    onChange={(e) => handleOnChange('gender', e.target.value)}
                                    className="form-control"
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </Validator>
                        </div>
                        <div className="form-group">
                            <label htmlFor="form-control" className="pb-2">
                                Phone Number
                                <span className="text-danger">*</span>
                            </label>
                            <Validator ref={phoneValidatorRef}>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone_number"
                                    name="phone_number"
                                    value={phone}
                                    onChange={(e) => handleOnChange('phone', e.target.value)}
                                    placeholder="Enter Your Phone Number"
                                />
                            </Validator>
                        </div>
                    </div>
                    <div className="col-md-6 gap-4 d-flex flex-column ">
                        <div className="form-group">
                            <label htmlFor="lastname" className="pb-2">
                                Last Name
                                <span className="text-danger">*</span>
                            </label>
                            <Validator ref={lastNameValidatorRef}>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastname"
                                    value={lastName}
                                    onChange={(e) => handleOnChange('lastname', e.target.value)}
                                    name="lastname"
                                    placeholder="Enter Your Last Name"
                                />
                            </Validator> 
                        </div>
                        <div className="form-group">
                            <label htmlFor="dob" className="pb-2">
                                Date Of Birth
                                <span className="text-danger">*</span>
                            </label>
                            <Validator ref={dobValidatorRef}>
                                <input
                                    value={dob}
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
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    value={address}
                                    onChange={(e) => handleOnChange('address', e.target.value)}
                                    name="address"
                                    placeholder="Enter Your Address"
                                />
                            </Validator>
                        </div>
                    </div>
                </div>

                <button type="submit" onClick={submitForm} className="components___edituserprofile-form-firstButton btn btn-primary btn-block">
                    Submit
                </button>
                <button type="submit" onClick={handleNextPage} className="components__login-form-secondButton">
                    <span>Back to Home Page</span>
                </button>
            </div>
        </div>
    );
};

export default EditUserProFileForm;
