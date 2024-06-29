export const formatHalfWidthText = (text: string) => {
    return text.replace(/[\uff01-\uff5e]/g, (character) => {
        return String.fromCharCode(character.charCodeAt(0) - 0xfee0);
    });
};

export const limitText = (text: string, char: number) => {
    let allText = text;
    const textLength = allText?.length;
    const startText = allText?.slice(0, char);
    textLength > char ? (allText = `${startText} ...`) : (allText = startText);
    return allText;
};
