export const formatHalfWidthText = (text: string) => {
    return text.replace(/[\uff01-\uff5e]/g, (character) => {
        return String.fromCharCode(character.charCodeAt(0) - 0xfee0);
    });
};
