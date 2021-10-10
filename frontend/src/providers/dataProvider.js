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
            // filter: JSON.stringify(params.filter),
            ...params.filter,
        };
        const url = `${baseApiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json.data,
            meta: json.meta,
            total: json.meta.total,
        }));
    },
    getOne: (resource, params) =>
        httpClient(`${baseApiUrl}/${resource}/${params.id}`).then(({ json }) => {
            //@FIXME Подумать, куда это вынести
            if (resource === 'parthner') {
                json.data.manager_id = json.data.manager.id;
            } else if (resource === 'order') {
                json.data.addressee_id = json.data.addressee?.id;
                json.data.client_id = json.data.client?.id;
                json.data.courier_issuer_id = json.data.courier_issuer?.id;
                json.data.courier_receiver_id = json.data.courier_receiver?.id;
                json.data.delivery_point_id = json.data.delivery_point?.id;
                json.data.master_id = json.data.master?.id;
                json.data.parthner_id = json.data.parthner?.id;
                json.data.pick_up_point_id = json.data.pick_up_point?.id;
                json.data.receiver_id = json.data.receiver?.id;
                json.data.source_id = json.data.source?.id;
                json.data.workshop_id = json.data.workshop?.id;
            }
            return { data: json.data };
        }),
    // getMany: (resource, params) => Promise,
    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ ids: params.ids }),
        };
        const url = `${baseApiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json.data }));
    },
    getManyReference: (resource, params) => Promise,
    create: (resource, params) =>
        httpClient(`${baseApiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: json.data,
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
