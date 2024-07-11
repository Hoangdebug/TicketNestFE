interface IButtonComponentProps extends IBaseCompProps {
    background?: string;
    textColor?: string;
    iconColor?: string;
    fontWeight?: string;
    className?: string;
    fontSize?: string;
    disabled?: boolean;
    startIcon?: string;
    endIcon?: string;
    buttonText?: string;
    borderColor?: string;
    fontWeight?: string;
    width?: string;
    height?: string;
    onClick?: () => void;
}

interface IButtonComponent<P = {}> extends IBaseComp<P> {}
