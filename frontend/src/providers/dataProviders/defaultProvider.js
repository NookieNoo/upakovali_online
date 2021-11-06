import { stringify } from 'query-string';
import { httpClient } from '@app-http';
import { baseApiUrl } from '@app-helpers';

const defaultProvider = {
    create: (resource, params) =>
        httpClient(`${baseApiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: json.data,
        })),
    update: (resource, params) => {
        console.log('params', params);

        return httpClient(`${baseApiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json.data }));
    },
};

export { defaultProvider };
