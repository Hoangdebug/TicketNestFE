import FirstErrorForm from "../components/Form/FirstError";
import { IFirstErrorPage, IFirstErrorPageProps } from "../interface/pages/firsterror";
import { images } from '../utils/Common';

const FirstErrorPage: IFirstErrorPage<IFirstErrorPageProps> = () => {
    return (
        <div className="pages__firsterror">
            <div className="pages__firsterror-content">
                <img style={{
                    width: 420,
                    height: 420
                }} className="pages__firsterror-logo" src={images.ERROR404_LOGO} alt="Logo" />
                <FirstErrorForm />
            </div>
        </div>
    );
}

export default FirstErrorPage;
