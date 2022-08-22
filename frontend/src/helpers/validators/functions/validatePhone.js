export const validatePhone = (val) => {
    //+7(333)232-3232
    // const isMatch = val.match(/^\+\d\((\d{3})\)\d\d\d-\d\d\d\d$/);
    const isMatch = val.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/);

    if (!isMatch) return 'Не валидный номер телефона';
    return undefined;
};
