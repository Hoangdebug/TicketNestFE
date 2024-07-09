interface IInputComponentProps extends IBaseCompProps {
    type?: 'text' | 'textarea' | 'password' | 'number' | 'float-number' | 'signed-number' | 'email';
    name?: string;
    id?: string;
    value?: string | number;
    rawValue?: string | number;
    placeholder?: string;
    className?: string;
    readOnly?: boolean;
    disabled?: boolean;
    rows?: number;
    min?: number;
    fontSize?: string;
    maxLength?: number;
    min?: number;
    max?: number;
    onChange?: (value: string) => void;
    onPress?: (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onBlur?: (value: string) => void;
    onFocus?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    onSelectSuggest?: (value: string) => void;
    onEndTyping?: (value: string) => void;
    isSuggest?: boolean;
    suggestions?: string[];
    isBlockSpecial?: boolean;
}

interface IInputComponentState {
    oldValue?: string;
    currentValue?: string | number;
    passwordShow?: boolean;
    isSelectSuggest?: boolean;
    isTyping?: boolean;
    typingTimer: number;
    suggestionElement?: Element | null;
    suggestionInputElement?: HTMLInputElement | null;
}
