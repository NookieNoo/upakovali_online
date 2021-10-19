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
    },
};

permissions = Object.freeze(permissions);

export { permissions };
