import { baseApiUrl } from "@app-helpers";

const authProvider = {
    // called when the user attempts to log in
    // login: ({ username }) => {
    //     localStorage.setItem("username", username);
    //     // accept all username/password combinations
    //     return Promise.resolve();
    // },
    login: ({ username, password }) => {
        const request = new Request(`${baseApiUrl}/login`, {
            method: 'POST',
            body: JSON.stringify({ email: username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });

        return fetch(request)
            .then(response => {
                if (!response.ok) {
                    //FIXME Протестировать
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(auth => {
                localStorage.setItem('token', auth.token);
                localStorage.setItem('user', JSON.stringify(auth.user));
                return Promise.resolve();
            })
            .catch((e) => {
                throw new Error('Не удалось аутентифицироваться');
            });
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        if (status === 401) {
            localStorage.removeItem("username");
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem("user")
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};

export default authProvider;
