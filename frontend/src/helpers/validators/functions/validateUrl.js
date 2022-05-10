export const validateUrl = (val) => {
    let url;

    try {
        url = new URL(val);
    } catch (_) {
        return 'Не валидный url';
    }

    return undefined;
};
