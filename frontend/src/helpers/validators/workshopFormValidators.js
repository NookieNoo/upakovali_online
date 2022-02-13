import { required, maxLength } from 'react-admin';

const createWorkshopFormValidators = {
    address: [required(), maxLength(255)],
};

const editWorkshopFormValidators = {
    address: [required(), maxLength(255)],
};

export { createWorkshopFormValidators, editWorkshopFormValidators };
