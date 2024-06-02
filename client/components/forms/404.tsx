import { useState } from 'react';

const FirstErrorForm: IFirstErrorComponent<IFirstErrorComponentProps> = () => {
    const [changeText, setChangeText] = useState();
    return (
        <div className="components__firsterror">
            <div className="components__firsterror-form p-4 ">
                <h1 className="components__firsterror-firsttext text-center">The page can not be found</h1>
                <h4 className="components__firsterror-secondtext text-center ">Reload or try it later, please.</h4>
                <button type="submit" className="components__firsterror-form-firstbutton">
                    Go homepage
                </button>
            </div>
        </div>
    );
};

export default FirstErrorForm;
