import { required, maxLength, email } from 'react-admin';

const createClientFormValidators = {
    full_name: [required(), maxLength(255)],
    phone: [required(), maxLength(50)],
    email: [required(), maxLength(255), email()],
    comment: []
};

const editClientFormValidators = {
    full_name: [required(), maxLength(255)],
    phone: [required(), maxLength(50)],
    email: [required(), maxLength(255), email()],
    comment: []
};

export { createClientFormValidators, editClientFormValidators };
