interface IModalReduxData {
    title?: string;
    content?: JSX.Element;
    button?: JSX.Element;
    isShow: boolean;
    cancelText?: string;
    background?: string;
    textColor?: string;
    borderColor?: string;
    fontSize?: string;
    onClose?: () => void;
    isHideButtonCancle?: boolean;
}

interface IModalReduxAction {
    type: string;
    data: IModalReduxData;
}
