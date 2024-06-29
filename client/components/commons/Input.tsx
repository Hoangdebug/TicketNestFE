import { forwardRef, useEffect, useState } from 'react';

import { stringHelper, validateHelper } from '@utils/helpers';
import Img from '@components/commons/Img';
import { images } from '@utils/constants';
import Autosuggest from 'react-autosuggest';

const Input = forwardRef<any, IInputComponentProps>((props, ref) => {
    const {
        name,
        id,
        disabled,
        type,
        className,
        onChange,
        onPress,
        value,
        rawValue,
        fontSize,
        placeholder,
        readOnly,
        maxLength,
        min,
        onKeyDown,
        onKeyUp,
        onBlur,
        onFocus,
        onClick,
        onSelectSuggest,
        onEndTyping,
        isSuggest,
        suggestions,
        isBlockSpecial,
    } = props;

    const [state, setState] = useState<IInputComponentState>({
        oldValue: value?.toString(),
        currentValue: rawValue ? rawValue : '',
        passwordShow: false,
        isSelectSuggest: false,
        isTyping: false,
        typingTimer: 1000,
        suggestionElement: undefined,
        suggestionInputElement: undefined,
    });

    const { oldValue, currentValue, passwordShow, suggestionElement, suggestionInputElement, isSelectSuggest, isTyping, typingTimer } =
        state;

    useEffect(() => {
        if (!rawValue) {
            setState((prevState) => ({
                ...prevState,
                currentValue: '',
            }));
        }
    }, [rawValue]);

    useEffect(() => {
        if (isSuggest) {
            const suggestionElement = document?.querySelector(`#${id}`);
            const suggestionInputElement = suggestionElement?.querySelector('input');

            if (suggestionInputElement) {
                suggestionInputElement.onfocus = () => {
                    suggestionElement?.classList.add('bases__border--link');
                };
                suggestionInputElement.onkeydown = (event: KeyboardEvent) => {
                    if (event.code !== 'ArrowUp' && event.code !== 'ArrowDown' && event.code !== 'Enter') {
                        handleOnTyping();
                    }
                };
            }

            setState((prevState) => ({
                ...prevState,
                suggestionElement,
                suggestionInputElement,
            }));
        }
    }, []);

    useEffect(() => {
        if (!value && isSelectSuggest) {
            if (suggestionInputElement) {
                suggestionInputElement.focus();
            }

            setState((prevState) => ({
                ...prevState,
                isSelectSuggest: false,
            }));
        }
    }, [value]);

    useEffect(() => {
        if (!isTyping && typingTimer < 1000) {
            setTimeout(() => {
                setState((prevState) => ({
                    ...prevState,
                    typingTimer: typingTimer <= 0 ? 1000 : typingTimer - 100,
                }));
            }, 100);

            if (typingTimer === 0 && onEndTyping) {
                onEndTyping(value?.toString() ?? '');
            }
        }
    }, [typingTimer]);

    useEffect(() => {
        if (isTyping) {
            setTimeout(() => {
                setState((prevState) => ({
                    ...prevState,
                    isTyping: false,
                    typingTimer: 900,
                }));
            }, 100);
        }
    }, [isTyping]);

    const handleSubmitSuggestion = (event: React.FormEvent<HTMLFormElement | HTMLTextAreaElement | HTMLInputElement>) => {
        event.preventDefault();
        if (suggestionElement && suggestionInputElement) {
            const suggestionHightlightElement = suggestionElement?.querySelector('.react-autosuggest__suggestion--highlighted div');
            const suggestionHightlightText = suggestionHightlightElement?.textContent;
            handleSelectSuggest(suggestionHightlightText ? suggestionHightlightText : suggestionInputElement?.value ?? '', true);
        }
    };

    const handleSelectSuggest = (eventValue: string, isSubmit: boolean = false) => {
        if (onSelectSuggest) {
            onSelectSuggest(eventValue);
            if (suggestionInputElement && isSubmit) {
                suggestionInputElement.blur();
            }

            setState((prevState) => ({
                ...prevState,
                isSelectSuggest: true,
            }));
        }
    };

    const handleOnTyping = () => {
        setState((prevState) => ({
            ...prevState,
            isTyping: true,
        }));
    };

    const togglePassword = () => {
        setState((prevState) => ({
            ...prevState,
            passwordShow: !passwordShow,
        }));
    };

    const handleOnChange = (eventValue: string) => {
        if (eventValue.length > (maxLength ?? 0)) {
            eventValue = oldValue?.length === (maxLength ?? 0) ? oldValue : eventValue.substring(0, maxLength);
        }

        let isValidValue = true;
        if (eventValue) {
            if (type === 'number' || type === 'float-number' || type === 'signed-number') {
                eventValue = stringHelper.formatHalfWidthText(eventValue);
            }
            if (
                (type === 'number' && !validateHelper.isNumber(eventValue)) ||
                (type === 'float-number' && !validateHelper.isFloatNumber(eventValue)) ||
                (isBlockSpecial && validateHelper.isSpecialCharacter(stringHelper.formatHalfWidthText(eventValue))) ||
                (type === 'signed-number' && !validateHelper.isSignedNumber(eventValue))
            ) {
                isValidValue = false;
            }
        }

        if (isValidValue && onChange) {
            setState((prevState) => ({
                ...prevState,
                oldValue: eventValue,
            }));

            onChange(eventValue);
        }
    };

    const handleOutFocus = (eventValue: string) => {
        eventValue = eventValue.trim();
        if (type === 'float-number' && eventValue.charAt(eventValue.length - 1) === '.') {
            eventValue = `${eventValue}0`;
        } else if (type === 'float-number' && eventValue.charAt(0) === '.') {
            eventValue = `0${eventValue}`;
        } else {
            if (rawValue) {
                setState((prevState) => ({
                    ...prevState,
                    currentValue: rawValue,
                }));
            }
        }

        // Convert full-width <--> half-width
        if (type !== 'password' && eventValue) {
            eventValue = stringHelper.formatHalfWidthText(eventValue);
        }

        setState((prevState) => ({
            ...prevState,
            oldValue: eventValue,
        }));

        if (onChange) {
            onChange(eventValue);
        }

        if (onBlur) {
            onBlur(eventValue);
        }
    };

    const handleFocus = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (rawValue) {
            event.currentTarget.value = value?.toString() ?? '';
            setState((prevState) => ({
                ...prevState,
                currentValue: '',
            }));
        }

        if (onChange) {
            onChange(event.target.value);
        }
        if (onFocus) {
            onFocus(event);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        handleOnTyping();
        let checkIfNum = false;
        if (event.key && type === 'number') {
            checkIfNum = event.key === 'e' || event.key === '.' || event.key === '+' || event.key === '-';
        }
        if (checkIfNum) {
            event.preventDefault();
        } else if (onKeyDown) {
            onKeyDown(event);
        }
    };

    if (isSuggest) {
        const renderSuggestion = (suggestion: string) => <div>{suggestion}</div>;

        return (
            <div id={id} className={`components__input-suggest bases__padding0 bases__font--${fontSize} ${className}`}>
                <form
                    onSubmit={(event: React.FormEvent<HTMLFormElement | HTMLTextAreaElement | HTMLInputElement>) =>
                        handleSubmitSuggestion(event)
                    }
                >
                    <Autosuggest
                        onSuggestionsFetchRequested={(_suggestion: Autosuggest.SuggestionsFetchRequestedParams) => {}}
                        onSuggestionsClearRequested={() => {}}
                        suggestions={suggestions ?? []}
                        getSuggestionValue={(suggestion: string) => suggestion ?? ''}
                        renderSuggestion={(suggestion: string) => renderSuggestion(suggestion)}
                        onSuggestionSelected={(_event, data: Autosuggest.SuggestionSelectedEventData<string>) =>
                            handleSelectSuggest(data.suggestionValue.toString() ?? '')
                        }
                        inputProps={{
                            placeholder: placeholder ?? '',
                            value: value?.toString() ?? '',
                            onChange: (_event, params: Autosuggest.ChangeEvent) => handleOnChange(params.newValue),
                            onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(event),
                            onBlur: () => {
                                handleOutFocus(value?.toString() ?? '');
                                suggestionElement?.classList.remove('bases__border--link');
                            },
                        }}
                    />
                </form>
            </div>
        );
    } else {
        if (type === 'textarea') {
            return (
                <textarea
                    ref={ref}
                    id={id}
                    name={name}
                    disabled={disabled}
                    value={currentValue ? currentValue : value}
                    className={`components__input components__input-area bases__font--${fontSize} ${className}`}
                    onInput={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleOnChange(event.target.value)}
                    onBlur={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleOutFocus(event.target.value)}
                    onFocus={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleFocus(event)}
                    onKeyPress={(event: React.KeyboardEvent<HTMLTextAreaElement>) => (onPress ? onPress(event) : {})}
                    onClick={(event: React.MouseEvent<HTMLElement>) => (onClick ? onClick(event) : {})}
                    autoComplete="off"
                    placeholder={placeholder}
                    onKeyDown={() => handleOnTyping()}
                />
            );
        }
    }

    return (
        <div className={`${type === 'password' ? 'position-relative' : 'w-100'}`}>
            <input
                ref={ref}
                type={type === 'number' || type === 'float-number' || (type === 'password' && passwordShow) ? 'text' : type}
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                autoComplete="off"
                id={id}
                name={name}
                disabled={disabled}
                value={currentValue ? currentValue : value}
                minLength={min}
                className={`components__input w-100 bases__font--${fontSize} ${className}`}
                onInput={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChange(event.target.value)}
                onBlur={(event: React.ChangeEvent<HTMLInputElement>) => handleOutFocus(event.target.value)}
                onFocus={(event: React.ChangeEvent<HTMLInputElement>) => handleFocus(event)}
                onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(event)}
                onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => (onPress ? onPress(event) : {})}
                onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => (onKeyUp ? onKeyUp(event) : {})}
                placeholder={placeholder}
                readOnly={readOnly}
            />
            {/* {type === 'password' ? (
                <Img
                    onClick={() => {
                        togglePassword();
                    }}
                    className={`components__input-icon bases__filter--dark-gray position-absolute`}
                    src={`${passwordShow ? images.ICON_EYE_SHOW : images.ICON_EYE_HIDE}`}
                />
            ) : (
                <></>
            )} */}
        </div>
    );
});

Input.defaultProps = {
    type: 'text',
    placeholder: '',
    className: '',
    fontSize: '14',
    onChange: () => {},
    onPress: () => {},
    readOnly: false,
    disabled: false,
    value: '',
    rows: 12,
    maxLength: 1000,
    min: 0,
};

export default Input;
