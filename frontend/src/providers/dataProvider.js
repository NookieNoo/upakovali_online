import { stringify } from 'query-string';
import { httpClient } from '@app-http';
import { baseApiUrl } from '@app-helpers';
console.log(baseApiUrl);

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
            total: json.total,
        }));
    },
    getOne: (resource, params) => Promise,
    getMany: (resource, params) => Promise,
    getManyReference: (resource, params) => Promise,
    create: (resource, params) => Promise,
    update: (resource, params) => Promise,
    updateMany: (resource, params) => Promise,
    delete: (resource, params) => Promise,
    deleteMany: (resource, params) => Promise,
};
