import { required, maxLength, email } from 'react-admin';
import { validatePhone } from './functions/validatePhone';

const createClientFormValidators = {
    full_name: [required(), maxLength(255)],
    phone: [required(), maxLength(50), validatePhone],
    email: [required(), maxLength(255), email()],
    comment: []
};

const editClientFormValidators = {
    full_name: [required(), maxLength(255)],
    phone: [required(), maxLength(50), validatePhone],
    email: [required(), maxLength(255), email()],
    comment: []
};

export { createClientFormValidators, editClientFormValidators };
