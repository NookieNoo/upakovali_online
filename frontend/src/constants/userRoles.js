let userRoles = {
    admin: {
        id: 1,
        name: 'admin',
        visible_name: 'Администратор',
    },
    manager: {
        id: 2,
        name: 'manager',
        visible_name: 'Менеджер',
    },
    master: {
        id: 3,
        name: 'master',
        visible_name: 'Мастер',
    },
    courier: {
        id: 4,
        name: 'courier',
        visible_name: 'Курьер',
    },
};

userRoles = Object.freeze(userRoles);

export { userRoles };
