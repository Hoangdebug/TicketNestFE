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
    const [showPassword, setShowPassword] = useState(false);
    // const { profile } = useSelector((states: ReduxStates) => states)

    const [state, setState] = useState<IEditUserProfileComponentState>({
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        phone : '',
        address: '',
    });
    const handleNextPage = () => {
        navigate.push(routes.CLIENT.REGISTER_PAGE.href);
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
        <div className="components__edituserprofile">
            <div className="components__edituserprofile-form p-4 ">
                <h2 className="fw-bold text-center">Edit Profile</h2>
                <div className="form-group">
                    <label htmlFor="username">First Name</label>                    
                </div>
                <div className="form-group position-relative">
                    <label htmlFor="password">
                        Last Name
                        <span className="text-danger">*</span>
                    </label>                                        
                </div>
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <div>
                        <input className="danger" type="checkbox" />
                        <label htmlFor="danger">Remember me</label>
                    </div>
                    <a href="" className="text-decoration-none">
                        Forgot password?
                    </a>
                </div>
                <button type="submit" onClick={submitForm} className="components__login-form-firstButton btn btn-primary btn-block">
                    Sign in
                </button>
                <button type="submit" onClick={handleNextPage} className="components__login-form-secondButton">
                    <span>Register for a free trial now</span>
                </button>
                <div className="text-center">Or sign in with</div>
                <button className="components__login-form-thirdButton">Google</button>
                <p id="error-message" className="error-message text-danger mt-2"></p>
            </div>
        </div>
    );
};

export default EditUserProFileForm;
