let serviceTypes = {
    DELIVERY_OR_PICKING: {
        id: 1,
        name: 'Доставка/Забор',
    },
    PACKAGE: {
        id: 2,
        name: 'Упаковка',
    },
    BOX: {
        id: 3,
        name: 'Коробки',
    },
    POSTCARD: {
        id: 4,
        name: 'Открытки',
    },
};

serviceTypes = Object.freeze(serviceTypes);

export { serviceTypes };
