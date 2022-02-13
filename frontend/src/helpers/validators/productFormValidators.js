import { required, maxLength } from 'react-admin';

const createProductFormValidators = {
    name: [required(), maxLength(255)],
};

const editProductFormValidators = {
    name: [required(), maxLength(255)],
};

export { createProductFormValidators, editProductFormValidators };
