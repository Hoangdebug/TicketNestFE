import FirstErrorForm from '@components/forms/404';
import { IFirstErrorPage, IFirstErrorPageProps } from '@interfaces/pages/firsterror';
import { images } from '@utils/constants';

const FirstErrorPage: IFirstErrorPage<IFirstErrorPageProps> = () => {
    return (
        <div className="pages__firsterror">
            <div className="pages__firsterror-content">
                <img
                    style={{
                        width: 420,
                        height: 420,
                    }}
                    className="pages__firsterror-logo"
                    src={images.ERROR404_LOGO}
                    alt="Logo"
                />
                <FirstErrorForm />
            </div>
        </div>
    );
};

export default FirstErrorPage;
