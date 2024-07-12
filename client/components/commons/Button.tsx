import { createRef } from 'react';
import Img from '@components/commons/Img';

const Button: IButtonComponent<IButtonComponentProps> = (props) => {
    const {
        buttonText,
        className,
        onClick,
        disabled,
        fontSize,
        background,
        textColor,
        fontWeight,
        borderColor,
        endIcon,
        startIcon,
        width,
        height,
        iconColor,
    } = props;
    const btn = createRef<HTMLButtonElement>();

    const handleClickButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { pageX, pageY, currentTarget } = event;

        const rect = currentTarget.getBoundingClientRect();
        const left = pageX - (rect.left + window.scrollX);
        const top = pageY - (rect.top + window.scrollY);
        if (!disabled) {
            const ripples = document.createElement('span');
            ripples.style.left = left + 'px';
            ripples.style.top = top + 'px';
            ripples.classList.add('components__button-ripple');
            btn?.current?.appendChild(ripples);

            const timeout = setTimeout(() => {
                clearTimeout(timeout);
                ripples.remove();
            }, 900);

            if (onClick) {
                onClick();
            }
        }
    };

    return (
        <button
            ref={btn}
            className={`components__button bases__font--${fontSize} bases__background--${background} bases__text--${textColor} bases__text--${fontWeight} bases__border--${borderColor} ${
                width ? `bases__width--${width}` : ''
            } ${height ? `bases__height--${height}` : ''} ${className}`}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleClickButton(event)}
            disabled={disabled}
        >
            {startIcon ? (
                <Img className={`components__button-icon--start bases__filter--${iconColor ? iconColor : textColor}`} src={startIcon} />
            ) : (
                <></>
            )}
            {buttonText}
            {endIcon ? <Img className={`components__button-icon--end bases__filter--${textColor}`} src={endIcon} /> : <></>}
        </button>
    );
};

Button.defaultProps = {
    className: '',
    buttonText: '',
    fontSize: '14',
    background: 'blue',
    borderColor: 'none',
    textColor: 'white',
    disabled: false,
    fontWeight: 'bold',
    onClick: () => {},
};

export default Button;
