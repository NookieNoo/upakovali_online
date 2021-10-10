let userRoles = {
    admin: {
        id: 1,
        name: 'Администратор',
    },
    manager: {
        id: 2,
        name: 'Менеджер',
    },
    master: {
        id: 3,
        name: 'Мастер',
    },
    courier: {
        id: 4,
        name: 'Курьер',
    },
};

userRoles = Object.freeze(userRoles);

export { userRoles };
