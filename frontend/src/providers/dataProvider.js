import { stringify } from 'query-string';
import { httpClient } from '@app-http';
import { baseApiUrl } from '@app-helpers';

export const dataProvider = {
    getList: (resource, params) => {
        console.log('resource', resource);
        console.log('params', params);
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${baseApiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json.data,
            meta: json.meta,
            total: json.meta.total,
        }));
    },
    getOne: (resource, params) =>
        httpClient(`${baseApiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),
    getMany: (resource, params) => Promise,
    getManyReference: (resource, params) => Promise,
    create: (resource, params) =>
        httpClient(`${baseApiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),
    update: (resource, params) => {
        console.log('update', params);
        return httpClient(`${baseApiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json.data }));
    },

    updateMany: (resource, params) => Promise,
    delete: (resource, params) =>
        httpClient(`${baseApiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),
    deleteMany: (resource, params) => Promise,
};
