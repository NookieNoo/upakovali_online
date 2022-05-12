import { stringify } from 'query-string';
import { httpClient } from '@app-http';
import { baseApiUrl } from '@app-helpers';
import { orderProvider } from './dataProviders';
import { defaultProvider } from './dataProviders';

export const dataProvider = {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        // Временно преобразуем поля типа manager.name в manager_id @FIXME
        const splittedField = field.split('.');
        const transformedField = splittedField.length > 1 ? splittedField[0] + '_id' : field;

        const query = {
            sort: order === 'ASC' ? transformedField : `-${transformedField}`,
            'page[number]': page,
            'page[size]': perPage,
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
            } else if (resource === 'price') {
                json.data.parthner_id = json.data.parthner?.id;
                json.data.services.forEach((it) => {
                    it.product_id = it.product.id;
                });
            } else if (resource === 'order') {
                json.data.gifts.forEach((it) => {
                    it.addressee_id = it.addressee.id;
                    it.service_id = it.service.id;
                });
                json.data.client_id = json.data.client?.id;
                json.data.courier_issuer_id = json.data.courier_issuer?.id;
                json.data.courier_receiver_id = json.data.courier_receiver?.id;
                json.data.delivery_point_id = json.data.delivery_point?.id;
                json.data.master_id = json.data.master?.id;
                json.data.order_status_id = json.data.order_status?.id;
                json.data.parthner_id = json.data.parthner?.id;
                json.data.pick_up_point_id = json.data.pick_up_point?.id;
                json.data.receiver_id = json.data.receiver?.id;
                json.data.source_id = json.data.source?.id;
                json.data.workshop_id = json.data.workshop?.id;
            }
            return { data: json.data };
        }),
    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ ids: params.ids }),
        };
        const url = `${baseApiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json.data }));
    },
    getManyReference: (resource, params) => {
        const { target, id: fk_id } = params;
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        // Временно преобразуем поля типа manager.name в manager_id @FIXME
        const splittedField = field.split('.');
        const transformedField = splittedField.length > 1 ? splittedField[0] + '_id' : field;

        let referenceFilterFields = {};
        target.split(',').forEach((it) => {
            referenceFilterFields[it] = fk_id;
        });

        const query = {
            sort: order === 'ASC' ? transformedField : `-${transformedField}`,
            'page[number]': page,
            'page[size]': perPage,
            // filter: JSON.stringify(params.filter),
            ...params.filter,
            ...referenceFilterFields,
        };
        const url = `${baseApiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json.data,
            meta: json.meta,
            total: json.meta.total,
        }));
    },
    create: (resource, params) => {
        switch (resource) {
            case 'order':
                return orderProvider.create(resource, params);
            default:
                return defaultProvider.create(resource, params);
        }
    },
    update: (resource, params) => {
        console.log('params', params);
        switch (resource) {
            case 'order':
                return orderProvider.update(resource, params);
            default:
                return defaultProvider.update(resource, params);
        }
    },
    updateField: (resource, params) => {
        return httpClient(`${baseApiUrl}/${resource}/${params.id}`, {
            method: 'PATCH',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json.data, message: json.message }));
    },
    updateMany: (resource, params) => Promise,
    delete: (resource, params) =>
        httpClient(`${baseApiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),
    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${baseApiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },
};
