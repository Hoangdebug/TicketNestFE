import { useRouter } from 'next/router';

const SecondErrorForm: ISecondErrorComponent<ISecondErrorComponentProps> = () => {
    const navigate = useRouter();
    const handleNextPage = () => {
        navigate.back();
    };

    return (
        <div className="components__seconderror">
            <div className="components__seconderror-form p-4 ">
                <h1 className="components__seconderror-firsttext text-center">VertZéro is overwhelmed</h1>
                <h4 className="components__seconderror-secondtext text-center ">Wait a moment and try again, please.</h4>
                <button onClick={handleNextPage} type="submit" className="components__seconderror-form-firstbutton">
                    Go homepage
                </button>
            </div>
        </div>
    );
};

export default SecondErrorForm;
