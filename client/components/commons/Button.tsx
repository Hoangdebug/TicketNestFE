import { createRef } from 'react';
import Img from '@components/commons/Img';

const Button: IButtonComponent<IButtonComponentProps> = (props) => {
    const {
        buttonText,
        className,
        onClick,
        onEndIconClick,
        disabled,
        fontSize,
        background,
        textColor,
        endIcon,
        startIcon,
        borderColor,
        iconColor,
        textClassName,
        fontWeight,
        iconSize,
        contentMode,
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
            className={`bases__border--${borderColor} components__button bases__font--${fontSize} bases__background--${background} bases__text--${textColor} ${className} ${
                disabled ? 'components__button_disable' : ''
            } ${contentMode === 'wrap' ? 'components__button_content-wrap' : ''}`}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleClickButton(event)}
            disabled={disabled}
        >
            {startIcon ? (
                <Img
                    width={iconSize}
                    height={iconSize}
                    className={`${buttonText ? 'components__button-icon--start' : ''} bases__filter--${iconColor ? iconColor : textColor}`}
                    src={startIcon}
                />
            ) : (
                <></>
            )}
            <div className={`${textClassName} bases__text--${fontWeight} components__button-text`}>{buttonText}</div>
            {endIcon ? (
                <Img
                    onClick={() => (onEndIconClick ? onEndIconClick() : {})}
                    width={iconSize}
                    className={`${buttonText ? 'components__button-icon--end' : ''} bases__filter--${iconColor ? iconColor : textColor}`}
                    src={endIcon}
                />
            ) : (
                <></>
            )}
        </button>
    );
};

Button.defaultProps = {
    className: '',
    fontSize: '18',
    background: 'red',
    textColor: 'white',
    disabled: false,
    onClick: () => {},
    onEndIconClick: () => {},
    borderColor: 'none',
    textClassName: '',
    fontWeight: 'bold',
    buttonText: '',
    iconSize: 17,
    contentMode: 'nowrap',
};

export default Button;
