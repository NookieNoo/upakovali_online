import { required, maxLength } from 'react-admin';

const createSourceFormValidators = {
    name: [required(), maxLength(255)],
};

const editSourceFormValidators = {
    name: [required(), maxLength(255)],
};

export { createSourceFormValidators, editSourceFormValidators };
