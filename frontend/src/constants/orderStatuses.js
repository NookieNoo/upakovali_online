let orderStatuses = {
    CREATED: {
        id: 1,
        name: 'Создан',
    },
    COURIER_APPOINTED: {
        id: 2,
        name: 'Курьер назначен',
        not_available: true,
    },
    WAS_TAKEN: {
        id: 3,
        name: 'Забрали',
    },
    ACCEPTED: {
        id: 4,
        name: 'Приняли'
    },
    IN_PROGRESS: {
        id: 5,
        name: 'В работе'
    },
    PACKED: {
        id: 6,
        name: 'Упаковали'
    },
    WAS_ISSUED: {
        id: 7,
        name: 'Выдали'
    },
    COURIER_ISSUES: {
        id: 8,
        name: 'Курьер выдает'
    },
    DELIVERED: {
        id: 9,
        name: 'Доставили'
    },
    PAID: {
        id: 10,
        name: 'Оплатили'
    },
    CANCELED: {
        id: 11,
        name: 'Отмена'
    }
};

orderStatuses = Object.freeze(orderStatuses);

export { orderStatuses };
