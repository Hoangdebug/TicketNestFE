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

            {message ? <div style={{marginTop: '4px', fontSize: "12px"}} className={`text-danger ${messageClassName}`}>{message}</div> : <></>}
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
