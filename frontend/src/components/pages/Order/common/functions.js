const replacer = (string) => {
    const map = {
        й: 'q',
        ц: 'w',
        у: 'e',
        к: 'r',
        е: 't',
        н: 'y',
        г: 'u',
        ш: 'i',
        щ: 'o',
        з: 'p',
        х: '[',
        ъ: ']',
        ф: 'a',
        ы: 's',
        в: 'd',
        а: 'f',
        п: 'g',
        р: 'h',
        о: 'j',
        л: 'k',
        д: 'l',
        ж: ';',
        э: "'",
        я: 'z',
        ч: 'x',
        с: 'c',
        м: 'v',
        и: 'b',
        т: 'n',
        ь: 'm',
        б: ',',
        ю: '.',
        '.': '/',
    };

    return string.replace(/[ЁёА-я/,.;\'\]\[]/g, function (x) {
        return x === x.toLowerCase() ? map[x] : map[x.toLowerCase()].toUpperCase();
    });
};

export { replacer };
