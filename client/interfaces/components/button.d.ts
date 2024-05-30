interface IButtonComponentProps extends IBaseCompProps {
    borderColor?: string;
    background?: string;
    textColor?: string;
    className?: string;
    fontSize?: string;
    disabled?: boolean;
    startIcon?: string;
    endIcon?: string;
    buttonText?: string;
    onClick?: () => void;
    onEndIconClick?: () => void;
    fontWeight?: string;
    iconColor?: string;
    textClassName?: string;
    iconSize?: number;
    contentMode?: 'wrap' | 'nowrap';
}

interface IButtonComponent<P = {}> extends IBaseComp<P> {}
