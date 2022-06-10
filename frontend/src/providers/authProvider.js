import { baseApiUrl } from '@app-helpers';
import { permissions } from '@app-constants';
import { fetchUtils } from 'react-admin';

export const authProvider = {
    login: ({ username, password }) => {
        return fetchUtils
            .fetchJson(`${baseApiUrl}/login`, {
                method: 'post',
                body: JSON.stringify({ email: username, password }),
                headers: new Headers({ 'Content-Type': 'application/json' }),
            })
            .then(({ status, headers, body, json }) => {
                localStorage.setItem('token', json.token);
                localStorage.setItem('user', JSON.stringify(json.user));
                return Promise.resolve();
            })
            .catch((e) => {
                console.log('Не удалось аутентифицироваться', e.message);
                throw new Error(e.message || 'Не удалось аутентифицироваться');
            });
    },
    logout: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        return Promise.resolve();
    },
    register: (values) => {
        return fetchUtils.fetchJson(`${baseApiUrl}/register`, {
            method: 'post',
            body: JSON.stringify(values),
        });
    },
    forgotPassword: (values) => {
        return fetchUtils.fetchJson(`${baseApiUrl}/forgot-password`, {
            method: 'post',
            body: JSON.stringify(values),
        });
    },
    resetPassword: (values) => {
        return fetchUtils.fetchJson(`${baseApiUrl}/reset-password`, {
            method: 'post',
            body: JSON.stringify(values),
        });
    },
    verifyEmail: (id, hash, body) => {
        return fetchUtils.fetchJson(`${baseApiUrl}/verify-email/${id}/${hash}`, {
            method: 'post',
            body: JSON.stringify(body),
        });
    },
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
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
