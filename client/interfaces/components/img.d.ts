interface IImgComponentProps extends IBaseCompProps {
    isBlur?: boolean;
    placeholder?: string;
    className?: string;
    src: string;
    onClick?: () => void;
    width?: number;
    height?: number;
}
