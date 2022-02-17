let permissions = {
    admin: {
        order: {
            list: true,
            create: true,
            edit: true,
            show: true,
            enabled: true,
        },
        client: {
            list: true,
            create: true,
            edit: true,
            show: true,
            enabled: true,
        },
        parthner: {
            list: true,
            create: true,
            edit: true,
            show: true,
            enabled: true,
        },
        user: {
            list: true,
            create: true,
            edit: true,
            show: true,
            enabled: true,
        },
        analytics: {
            enabled: true,
        },
        activity: {
            list: true,
        },
        price: {
            enabled: true,
            list: true,
            show: true,
            edit: true,
            create: true,
        },
        workshop: {
            enabled: true,
            list: true,
            show: true,
            edit: true,
            create: true,
        },
        addressee: {
            enabled: true,
            list: true,
            show: true,
            edit: true,
            create: true,
        },
        product: {
            enabled: true,
            list: true,
            show: true,
            edit: true,
            create: true,
        },
        source: {
            enabled: true,
            list: true,
            show: true,
            edit: true,
            create: true,
        },
    },
    manager: {
        order: {
            list: true,
            create: true,
            edit: true,
            show: true,
            enabled: true,
        },
        client: {
            list: true,
            create: false,
            edit: false,
            show: true,
            enabled: true,
        },
        parthner: {
            list: true,
            create: false,
            edit: false,
            show: true,
            enabled: true,
        },
        user: {
            list: true,
            create: false,
            edit: false,
            show: true,
            enabled: true,
        },
        analytics: {
            enabled: false,
        },
        activity: {
            list: false,
        },
        price: {
            enabled: false,
            list: false,
            show: false,
            edit: false,
            create: false,
        },
        workshop: {
            enabled: true,
            list: false,
            show: false,
            edit: false,
            create: false,
        },
        addressee: {
            enabled: true,
            list: false,
            show: false,
            edit: false,
            create: false,
        },
        source: {
            enabled: true,
            list: false,
            show: false,
            edit: false,
            create: false,
        },
    },
    master: {
        order: {
            list: true,
            create: true,
            edit: false,
            show: true,
            enabled: true,
        },
        client: {
            list: true,
            create: false,
            edit: false,
            show: false,
            enabled: false,
        },
        parthner: {
            list: true,
            create: false,
            edit: false,
            show: false,
            enabled: false,
        },
        user: {
            list: true,
            create: false,
            edit: false,
            show: false,
            enabled: false,
        },
        analytics: {
            enabled: false,
        },
        activity: {
            list: false,
        },
        price: {
            list: false,
        },
        workshop: {
            enabled: true,
            list: false,
            show: true,
            edit: false,
            create: false,
        },
        source: {
            enabled: true,
            list: false,
            show: false,
            edit: false,
            create: false,
        },
    },
    courier: {
        order: {
            list: true,
            create: false,
            edit: false,
            show: true,
            enabled: true,
        },
        client: {
            list: false,
            create: false,
            edit: false,
            show: false,
            enabled: false,
        },
        parthner: {
            list: false,
            create: false,
            edit: false,
            show: false,
            enabled: false,
        },
        user: {
            list: false,
            create: false,
            edit: false,
            show: false,
            enabled: false,
        },
        analytics: {
            enabled: false,
        },
        activity: {
            list: false,
        },
        price: {
            list: false,
        },
        workshop: {
            enabled: true,
            list: false,
            show: true,
            edit: false,
            create: false,
        },
        source: {
            enabled: true,
            list: false,
            show: false,
            edit: false,
            create: false,
        },
    },
};

permissions = Object.freeze(permissions);

export { permissions };
