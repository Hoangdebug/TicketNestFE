import { Modal as ModalBootstrap } from 'react-bootstrap';
import Img from '@components/commons/Img';
import Button from '@components/commons/Button';

import { useSelector, useDispatch } from 'react-redux';
import { ReduxStates } from '@redux/reducers';
import { setModal } from '@redux/actions';

import { images } from '@utils/constants';

const Modal: IModalComponent<IModalComponentProps> = (props) => {
    const { background, textColor, borderColor, fontSize } = props;
    const dispatch = useDispatch();
    const { modal } = useSelector((states: ReduxStates) => states);

    const handleModalHide = () => {
        if (modal.onClose) {
            modal.onClose();
        }
        dispatch(
            setModal({
                ...modal,
                isShow: !modal.isShow,
            }),
        );
    };

    return (
        <ModalBootstrap centered={true} show={modal.isShow} onHide={() => handleModalHide()} keyboard={false}>
            <div className="components__modal-heading d-flex justify-content-between align-items-center">
                <div className="bases__text--bold bases__font--20 bases__text--black w-100 text-center">{modal?.title}</div>
                <Img
                    className="bases__p--cursor bases__filter--blue-gray"
                    onClick={() => handleModalHide()}
                    width={24}
                    height={24}
                    src={images.ICON_CLOSE}
                />
            </div>
            <div className="components__modal-content d-flex justify-content-center text-pre-wrap bases__padding--horizontal20">
                <div>{modal?.content ?? <></>}</div>
            </div>
            <div className="components__modal-footer d-flex justify-content-center bases__margin--top32">
                {modal.button ?? <></>}
                {modal?.isHideButtonCancle !== true && (
                    <Button
                        onClick={() => handleModalHide()}
                        fontSize={fontSize}
                        background={modal.button ? background : 'blue'}
                        textColor={modal.button ? textColor : 'white'}
                        buttonText={modal.cancelText ?? 'Cancel'}
                        borderColor={borderColor ?? 'gray'}
                    />
                )}
            </div>
        </ModalBootstrap>
    );
};

Modal.defaultProps = {
    background: 'white',
    textColor: 'blue',
    borderColor: 'blue',
    fontSize: '14',
};

export default Modal;
