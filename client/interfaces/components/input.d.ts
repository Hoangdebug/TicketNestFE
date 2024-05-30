interface IInputComponentProps extends IBaseCompProps {
    type?: 'text' | 'textarea' | 'password' | 'number';
    name?: string;
    id?: string;
    value?: string | number;
    placeholder?: string;
    className?: string;
    formClassName?: string;
    readOnly?: boolean;
    disabled?: boolean;
    rows?: number;
    fontSize?: string;
    onBlur?: (value: string) => void;
    onChange?: (value: string) => void;
    onSelectSuggest?: (value: string) => void;
    onEndTyping?: (value: string) => void;
    onPress?: (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onSubmit?: () => void;
    maxLength?: number;
    min?: number;
    max?: number;
    isSuggest?: boolean;
    isFormFlex?: boolean;
    suggestions?: string[];
}

interface IInputComponentState {
    isSelectSuggest?: boolean;
    isTyping?: boolean;
    typingTimer: number;
    suggestionElement?: Element | null;
    suggestionInputElement?: HTMLInputElement | null;
}
