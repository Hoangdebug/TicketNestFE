import { use, useState } from "react"

const RegisterForm: IRegisterComponent<IRegisterComponentProps> = () => {
  const [state, setState] = useState <IRegisterComponentState>({
    userName: ''
  });
  const { userName } = state;

  const handleOnChange = (feild: string, value: string | null) => {
    setState((prev) => ({
      ...prev,
      [feild] : value
    }))
  }

  const handleOnClick = (field: string, value: boolean | null) => {
    setState((prev) => ({
      ...prev,
      [field]: value
    }))
  }
  console.log("test", userName);
  
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
              <input type="text" 
              className="form-control" 
              id="username"
              // value={userName}
              // onChange={(value: string) => handleOnChange('username', value)}
              name="username" required placeholder="Enter User Name" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="pb-2">Email
                <span className="text-danger">*</span>
              </label>
              <input type="email" className="form-control" id="email" name="email" required placeholder="Enter Email" />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="pb-2">Password
                <span className="text-danger">*</span>
              </label>
              <input type="password" className="form-control" id="password" name="password" required placeholder="Enter Password" />
            </div>
          </div>
          <div className="col-md-6 gap-4 d-flex flex-column ">
            <div className="form-group">
              <label htmlFor="confirm_password" className="pb-2">Confirm Password
                <span className="text-danger">*</span>
              </label>
              <input type="password" className="form-control" id="confirm_password" name="confirm_password" required placeholder="Enter Confirm Password" />
            </div>
            <div className="form-group">
              <label htmlFor="form-control" className="pb-2">Phone Number
                <span className="text-danger">*</span>
              </label>
              <input type="phonenumber" className="form-control" id="phone_number" name="phone_number" required placeholder="Enter Phone Number" />
            </div>
            <div className="form-group">
              <label htmlFor="dob" className="pb-2">Date Of Birth
                <span className="text-danger">*</span>
              </label>
              <input type="date" className="form-control" id="dob" name="pdob" required />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-success btn-block">Sign Up</button>
        <button type="button" className="btn btn-sencondary btn-block text-success">Back to Sign In</button>
      </div>
    </div>
  )
}
5
export default RegisterForm
