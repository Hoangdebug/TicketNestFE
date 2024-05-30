import ScaleLoader from 'react-spinners/ScaleLoader';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { ReduxStates } from '@redux/reducers';

const Loader: ILoaderComponent<ILoaderComponentProps> = () => {
    const { loader } = useSelector((states: ReduxStates) => states);

    useEffect(() => {
        if (loader) {
            document.documentElement.classList.add('no-scroll');
        } else {
            document.documentElement.classList.remove('no-scroll');
        }
    }, [loader]);

    return loader ? (
        <div className="components__loader">
            <div className="components__loader-spinner">
                <ScaleLoader color="#fff" height={40} loading={true} />
            </div>
        </div>
    ) : (
        <></>
    );
};

export default Loader;
