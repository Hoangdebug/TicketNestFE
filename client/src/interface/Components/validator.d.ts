interface IValidatorComponentProps extends IBaseCompProps {
    className?: string;
    messageClassName?: string;
    message?: string;
    isShowRedBorder?: boolean;
}

interface IValidatorComponentHandle {
    onValidateMessage: (mess: string) => void;
}

interface IValidatorComponent<P = {}> extends IBaseComp<P> {}
