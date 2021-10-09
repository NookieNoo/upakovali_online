import { required, maxLength, email } from 'react-admin';

const submitValidator = ({ password, password_confirmation }) => {
    const errors = {};

    if (password_confirmation !== password) {
        errors.password = 'Пароли не совпадают';
        errors.password_confirmation = 'Пароли не совпадают';
    }
    return errors;
};

const createUserFormValidators = {
    full_name: [required(), maxLength(255)],
    phone: [required(), maxLength(50)],
    email: [required(), maxLength(255), email()],
    password: [required(), maxLength(255)],
    role_id: [required()],
    submit: submitValidator,
};

const editUserFormValidators = {
    full_name: [required(), maxLength(255)],
    phone: [required(), maxLength(50)],
    password: [maxLength(255)],
    role_id: [required()],
    submit: submitValidator,
};

export { createUserFormValidators, editUserFormValidators };
