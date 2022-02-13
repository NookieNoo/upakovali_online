import { required, maxLength } from 'react-admin';

const createAddresseeFormValidators = {
    name: [required(), maxLength(255)],
};

const editAddresseeFormValidators = {
    name: [required(), maxLength(255)],
};

export { createAddresseeFormValidators, editAddresseeFormValidators };
