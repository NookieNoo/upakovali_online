import { baseApiUrl } from '@app-helpers';
import { permissions } from '@app-constants';

export const authProvider = {
    login: ({ username, password }) => {
        const request = new Request(`${baseApiUrl}/login`, {
            method: 'POST',
            body: JSON.stringify({ email: username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });

        return fetch(request)
            .then((response) => {
                if (!response.ok) {
                    //FIXME Протестировать
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((auth) => {
                localStorage.setItem('token', auth.token);
                localStorage.setItem('user', JSON.stringify(auth.user));
                return Promise.resolve();
            })
            .catch((e) => {
                throw new Error('Не удалось аутентифицироваться');
            });
    },
    logout: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        return Promise.resolve();
    },
    checkError: ({ status }) => {
        if (status === 401) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('user') ? Promise.resolve() : Promise.reject();
    },
    getPermissions: () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const roleName = user?.role.name;

        return roleName ? Promise.resolve(permissions[roleName]) : Promise.reject();
    },
    getIdentity: () => {
        try {
            const { id, full_name, avatar, role, phone, email } = JSON.parse(localStorage.getItem('user'));
            return Promise.resolve({ id, fullName: full_name, avatar, role, phone, email });
        } catch (error) {
            return Promise.reject(error);
        }
    },
};
