let permissions = {
    admin: {
        order: {
            list: true,
            create: true,
            edit: true,
            show: true,
        },
        client: {
            list: true,
            create: true,
            edit: true,
            show: true,
        },
        parthner: {
            list: true,
            create: true,
            edit: true,
            show: true,
        },
        user: {
            list: true,
            create: true,
            edit: true,
            show: true,
        },
    },
    manager: {
        order: {
            list: true,
            create: true,
            edit: true,
            show: true,
        },
        client: {
            list: true,
            create: false,
            edit: false,
            show: true,
        },
        parthner: {
            list: true,
            create: false,
            edit: false,
            show: true,
        },
        user: {
            list: true,
            create: false,
            edit: false,
            show: true,
        },
    },
    master: {
        order: {
            list: true,
            create: true,
            edit: false,
            show: true,
        },
        client: {
            list: true,
            create: false,
            edit: false,
            show: false,
        },
        parthner: {
            list: true,
            create: false,
            edit: false,
            show: false,
        },
        user: {
            list: true,
            create: false,
            edit: false,
            show: false,
        },
    },
    courier: {
        order: {
            list: true,
            create: false,
            edit: false,
            show: true,
        },
        client: {
            list: false,
            create: false,
            edit: false,
            show: false,
        },
        parthner: {
            list: false,
            create: false,
            edit: false,
            show: false,
        },
        user: {
            list: false,
            create: false,
            edit: false,
            show: false,
        },
    },
};

permissions = Object.freeze(permissions);

export { permissions };
