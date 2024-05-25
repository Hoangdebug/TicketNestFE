import ScaleLoader from 'react-spinners/ScaleLoader';
import { useSelector } from 'react-redux';
import { ReduxStates } from '../../redux/reducers';
import { useEffect } from 'react';

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
    <div>
      <div className="components__loader">
            <div className="components__loader-spinner">
                <ScaleLoader color="#fff" height={40} loading={true} />
            </div>
        </div>
    </div>
  ):(
    <></>
  )
}

export default Loader
