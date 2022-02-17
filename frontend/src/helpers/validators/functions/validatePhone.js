export const validatePhone = (val) => {
    //+7(333)232-3232
    const isMatch = val.match(/^\+\d\((\d{3})\)\d\d\d-\d\d\d\d$/);

    if (!isMatch) return 'Формат +7(###)###-###';
    return undefined;
};
