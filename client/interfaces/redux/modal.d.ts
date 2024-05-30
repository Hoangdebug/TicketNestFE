interface IModalReduxData {
    isShow: boolean;
    title?: string;
    content?: JSX.Element;
    closeOnOutsiteClick?: boolean;
    onClose?: () => void;
    isHideButtons?: boolean;
    buttonText?: string;
    cancelText?: string;
}

interface IModalReduxAction {
    type: string;
    data: IModalReduxData;
}
