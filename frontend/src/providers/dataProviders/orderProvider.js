import { httpClient } from '@app-http';
import { baseApiUrl } from '@app-helpers';
import { convertFileToBase64 } from '@app-helpers';
import { VIRTUAL_PARTNER_ID } from '@app-constants';

const orderProvider = {
    create: (resource, params) => {
        if (params.parthner_id === VIRTUAL_PARTNER_ID) delete params.parthner_id;
        const newPictures = params.data.order_photos.filter((p) => p.rawFile instanceof File);
        const formerPictures = params.data.order_photos.filter((p) => !(p.rawFile instanceof File));
        return Promise.all(newPictures.map(convertFileToBase64))
            .then((base64Pictures) =>
                base64Pictures.map((picture64) => {
                    return {
                        src: picture64.result,
                        title: picture64.title,
                    };
                })
            )
            .then((transformedNewPictures) =>
                httpClient(`${baseApiUrl}/${resource}`, {
                    method: 'POST',
                    body: JSON.stringify({
                        ...params.data,
                        order_photos: [...transformedNewPictures, ...formerPictures],
                    }),
                })
            )
            .then(({ json }) => ({
                data: json.data,
            }));
    },
    update: (resource, params) => {
        console.log('params', params);
        if (params.parthner_id === VIRTUAL_PARTNER_ID) delete params.parthner_id;

        const newPictures = params.data.order_photos.filter((p) => p.rawFile instanceof File);
        const formerPictures = params.data.order_photos.filter((p) => !(p.rawFile instanceof File));
        return Promise.all(newPictures.map(convertFileToBase64))
            .then((base64Pictures) =>
                base64Pictures.map((picture64) => {
                    return {
                        src: picture64.result,
                        title: picture64.title,
                    };
                })
            )
            .then((transformedNewPictures) =>
                httpClient(`${baseApiUrl}/${resource}/${params.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        ...params.data,
                        order_photos: [...transformedNewPictures, ...formerPictures],
                    }),
                })
            )
            .then(({ json }) => ({
                data: json.data,
            }));
    },
};

export { orderProvider };
