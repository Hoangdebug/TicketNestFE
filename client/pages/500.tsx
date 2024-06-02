import { images } from '@utils/constants';
import SecondErrorForm from '../components/forms/500';
import { ISecondErrorPage, ISecondErrorPageProps } from '@interfaces/pages/seconderror';

const SecondErrorPage: ISecondErrorPage<ISecondErrorPageProps> = () => {
    return (
        <div className="pages__seconderror">
            <div className="pages__seconderror-content">
                <img
                    style={{
                        width: 420,
                        height: 420,
                    }}
                    className="pages__seconderror-logo"
                    src={images.ERROR500_LOGO}
                    alt="Logo"
                />
                <SecondErrorForm />
            </div>
        </div>
    );
};

export default SecondErrorPage;
