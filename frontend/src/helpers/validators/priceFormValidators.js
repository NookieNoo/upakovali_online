import { required, maxLength } from 'react-admin';

const createPriceFormValidators = {
    name: [required(), maxLength(255)],
    start: [required()],
    end: [required()],
    parthner_id: [required()],
};

const editPriceFormValidators = {
    name: [required(), maxLength(255)],
    start: [required()],
    end: [required()],
    parthner_id: [required()],
};

export { createPriceFormValidators, editPriceFormValidators };
