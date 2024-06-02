import { useState } from 'react';

const ThirdErrorForm: IThirdErrorComponent<IThirdErrorComponentProps> = () => {
    const [changeText, setChangeText] = useState();
    return (
        <div className="components__thirderror">
            <div className="components__thirderror-form p-4 ">
                <h1 className="components__thirderror-firsttext text-center">Access Limited</h1>
                <h4 className="components__thirderror-secondtext text-center ">Sorry, you don't have permission to access this page.</h4>
                <button type="submit" className="components__thirderror-form-firstbutton">
                    Back to the previous
                </button>
            </div>
        </div>
    );
};

export default ThirdErrorForm;
