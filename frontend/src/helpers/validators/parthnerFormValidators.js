import { required, maxLength, email } from 'react-admin';
import { validatePhone } from './functions/validatePhone';

const createParthnerFormValidators = {
    full_name: [required(), maxLength(255)],
    phone: [required(), maxLength(50), validatePhone],
    email: [required(), maxLength(255), email()],
    comment: [],
    manager_id: [required()],
};

const editParthnerFormValidators = {
    full_name: [required(), maxLength(255)],
    phone: [required(), maxLength(50), validatePhone],
    email: [required(), maxLength(255), email()],
    comment: [],
    manager_id: [required()],
};

export { createParthnerFormValidators, editParthnerFormValidators };
