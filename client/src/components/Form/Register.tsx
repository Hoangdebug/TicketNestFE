import { createRef, useState } from "react"
import Validator from "../Common/Validator";
import { validateHelper } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { fetchRegister } from "../../redux/actions/api";
// import { useNavigate } from "react-router-dom";
// import { routes } from "../../utils/routes";

const RegisterForm: IRegisterComponent<IRegisterComponentProps> = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [state, setState] = useState<IRegisterComponentState>({
    username: '',
    email: '',
    phone: '',
    dob: '',
    password: '',
    confirmPassword: '',
  });
  const { username, email, phone, dob, password, confirmPassword } = state;


  const emailValidatorRef = createRef<IValidatorComponentHandle>();
  const passwordValidatorRef = createRef<IValidatorComponentHandle>();
  const phoneValidatorRef = createRef<IValidatorComponentHandle>();
  const confirmPasswordValidatorRef = createRef<IValidatorComponentHandle>();
  const dobValidatorRef = createRef<IValidatorComponentHandle>();
  const usernameValidatorRef = createRef<IValidatorComponentHandle>();

  const handleOnChange = (feild: string, value: string | null) => {
    setState((prev) => ({
      ...prev,
      [feild]: value
    }))
  }

  // const handleOnClick = (field: string, value: boolean | null) => {
  //   setState((prev) => ({
  //     ...prev,
  //     [field]: value
  //   }))
  // }

  const handleSubmit = async () => {
    let isValidate = true;

    const validator = [
      { ref: emailValidatorRef, value: email, message: 'Your First Name Is Not Empty!' },
      { ref: phoneValidatorRef, value: phone, message: 'Your Last Name Is Not Empty!' },
      { ref: usernameValidatorRef, value: username, message: 'Your Email Address Is Not Empty!' },
      { ref: dobValidatorRef, value: dob, message: 'Your Date Of Birth Is Not Empty!' },
      { ref: passwordValidatorRef, value: password, message: 'Your Password Is Not Empty!' },
      { ref: confirmPasswordValidatorRef, value: confirmPassword, message: 'Your Confirm Password Is Not Empty!' },
    ]

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

    if (confirmPassword !== password) {
      confirmPasswordValidatorRef.current?.onValidateMessage('Password And Confirm Password Is Not Same. Please Enter Again');
      isValidate = false;
    }

    if (isValidate) {
      // dispatch(
      //   fetchRegister({
      //     username,
      //     email,
      //     phone,
      //     dob,
      //     password,
      //     confirmPassword
      //   })
      // )
    }
  }
  return (
    <div className="components__register ">
      <div className="components__register-form p-3">
        <h2 className='fw-bold mb-4 text-center'>Sign Up</h2>
        <div className="row">
          <div className="col-md-6 gap-4 d-flex flex-column ">
            <div className="form-group">
              <label htmlFor="username" className="pb-2">Username
                <span className="text-danger">*</span>
              </label>
              <Validator ref={usernameValidatorRef}>
                <input type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => handleOnChange('username', e.target.value)}
                  name="username" required placeholder="Enter User Name"
                />
              </Validator>

            </div>
            <div className="form-group">
              <label htmlFor="email" className="pb-2">Email
                <span className="text-danger">*</span>
              </label>
              <Validator ref={emailValidatorRef}>
                <input type="email"
                  value={email}
                  onChange={(e) => handleOnChange('email', e.target.value)}
                  className="form-control"
                  id="email"
                  name="email"
                  required placeholder="Enter Email"
                />
              </Validator>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="pb-2">Password
                <span className="text-danger">*</span>
              </label>
              <Validator ref={passwordValidatorRef}>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => handleOnChange('password', e.target.value)}
                  required placeholder="Enter Password"
                />
              </Validator>
            </div>
          </div>
          <div className="col-md-6 gap-4 d-flex flex-column ">
            <div className="form-group">
              <label htmlFor="confirm_password" className="pb-2">Confirm Password
                <span className="text-danger">*</span>
              </label>
              <Validator ref={confirmPasswordValidatorRef}>
                <input
                  type="password"
                  className="form-control"
                  id="confirm_password"
                  name="confirm_password"
                  value={confirmPassword}
                  onChange={(e) => handleOnChange('confirmPassword', e.target.value)}
                  required placeholder="Enter Confirm Password"
                />
              </Validator>
            </div>
            <div className="form-group">
              <label htmlFor="form-control" className="pb-2">Phone Number
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
                  required placeholder="Enter Phone Number"
                />
              </Validator>
            </div>
            <div className="form-group">
              <label htmlFor="dob" className="pb-2">Date Of Birth
                <span className="text-danger">*</span>
              </label>
              <Validator ref={dobValidatorRef}>
                <input
                  value={dob}
                  onChange={(e) => handleOnChange('dob', e.target.value)}
                  type="date"
                  className="form-control"
                  id="dob"
                  name="pdob"
                  required />
              </Validator>
            </div>
          </div>
        </div>
        <button type="submit" className="components__register-form-firstbutton btn btn-primary btn-block" onClick={() => handleSubmit()}>Sign Up</button>
        <button type="button" className="components__register-form-secondbutton btn btn-sencondary btn-block "> <span>Back to Sign In</span></button>
      </div>
    </div>
  )
}

export default RegisterForm
