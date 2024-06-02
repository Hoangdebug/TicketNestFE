import ThirdErrorForm from "../components/Form/ThirdError";
import { IThirdErrorPage, IThirdErrorPageProps } from "../interface/pages/thirderror";
import { images } from '../utils/Common';

const ThirdErrorPage: IThirdErrorPage<IThirdErrorPageProps> = () => {
    return (
        <div className="pages__thirderror">
            <div className="pages__thirderror-content">
                <img style={{
                    width: 420,
                    height: 420
                }} className="pages__thirderror-logo" src={images.ERROR403_LOGO} alt="Logo" />
                <ThirdErrorForm />
            </div>
        </div>
    );
}

export default ThirdErrorPage;
