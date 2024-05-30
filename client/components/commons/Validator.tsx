import { useState, useImperativeHandle, forwardRef } from 'react';

const Validator = forwardRef<IValidatorComponentHandle, IValidatorComponentProps>((props, ref) => {
    const [message, setMessage] = useState<string>('');
    const { children, className, messageClassName, isShowRedBorder } = props;

    useImperativeHandle(ref, () => ({
        onValidateMessage: (mess: string) => {
            setMessage(mess);
        },
    }));

    return (
        <>
            <div className={`${message && isShowRedBorder ? 'components__validator-input' : ''} ${className}`}>{children}</div>

            {message ? <div className={`bases__margin--top4 bases__text--red bases__font--12 ${messageClassName}`}>{message}</div> : <></>}
        </>
    );
});

Validator.defaultProps = {
    className: '',
    messageClassName: '',
    message: '',
    isShowRedBorder: true,
};

export default Validator;
