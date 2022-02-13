import { required, maxLength, minValue } from 'react-admin';

const createPriceFormValidators = {
    name: [required(), maxLength(255)],
    start: [required()],
    end: [required()],
    parthner_id: [required()],
    services: [required()],
    'services.name': [required(), maxLength(255)],
    'services.sum': [required(), minValue(0)],
    'services.product_id': [required()],
};

const editPriceFormValidators = {
    name: [required(), maxLength(255)],
    start: [required()],
    end: [required()],
    parthner_id: [required()],
    services: [required()],
    'services.name': [required(), maxLength(255)],
    'services.sum': [required(), minValue(0)],
    'services.product_id': [required()],
};

export { createPriceFormValidators, editPriceFormValidators };
