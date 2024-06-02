import { useState } from 'react';

const SecondErrorForm: ISecondErrorComponent<ISecondErrorComponentProps> = () => {
    const [changeText, setChangeText] = useState();
    return (
        <div className="components__seconderror">
            <div className="components__seconderror-form p-4 ">
                <h1 className="components__seconderror-firsttext text-center">VertZéro is overwhelmed</h1>
                <h4 className="components__seconderror-secondtext text-center ">Wait a moment and try again, please.</h4>
                <button type="submit" className="components__seconderror-form-firstbutton">Refresh</button>
            </div>
        </div>
    );
};

export default SecondErrorForm;
