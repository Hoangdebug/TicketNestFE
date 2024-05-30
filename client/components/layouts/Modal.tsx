import { Modal as ModalBootstrap } from 'react-bootstrap';

import Img from '@components/commons/Img';
import Button from '@components/commons/Button';

import { useSelector, useDispatch } from 'react-redux';
import { ReduxStates } from '@redux/reducers';
import { setModal } from '@redux/actions';

import { images } from '@utils/constants';
import { useTrans } from '@utils/hooks';

const Modal: IModalComponent<IModalComponentProps> = () => {
    const trans = useTrans();
    const dispatch = useDispatch();
    const { modal } = useSelector((states: ReduxStates) => states);

    const handleModalShow = () => {
        if (modal.isShow && modal.onClose) {
            modal.onClose();
        }
        dispatch(
            setModal({
                ...modal,
                isShow: !modal.isShow,
                closeOnOutsiteClick: false,
                isHideButtons: false,
            }),
        );
    };

    return (
        <ModalBootstrap
            className="components__modal"
            backdrop={modal.closeOnOutsiteClick ? modal.closeOnOutsiteClick : 'static'}
            show={modal.isShow}
            onHide={() => handleModalShow()}
            keyboard={false}
        >
            <div className="components__modal-heading d-flex justify-content-between align-items-center">
                <div className="bases__text--bold bases__font--20">{modal?.title}</div>
                <Img
                    className="bases__p--cursor bases__filter--gray"
                    onClick={() => handleModalShow()}
                    width={24}
                    height={24}
                    src={images.ICON_CLOSE}
                />
            </div>
            <div className="components__modal-content">{modal?.content ?? <></>}</div>
            {!modal.isHideButtons && (
                <div className="components__modal-footer d-flex justify-content-end">
                    <Button
                        className="bases__margin--right8"
                        onClick={() => handleModalShow()}
                        fontSize="16"
                        background="white"
                        textColor="black"
                        buttonText={modal.cancelText ?? trans.common.cancel}
                        borderColor="gray"
                    />
                    {modal.buttonText && (
                        <Button
                            className=""
                            onClick={() => handleModalShow()}
                            fontSize="16"
                            background="red"
                            buttonText={modal.buttonText}
                        />
                    )}
                </div>
            )}
        </ModalBootstrap>
    );
};

export default Modal;
