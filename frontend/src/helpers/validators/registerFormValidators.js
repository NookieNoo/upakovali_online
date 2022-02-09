import { required, maxLength, email } from 'react-admin';

const submitValidator = ({ password, password_confirmation }) => {
    const errors = {};

    if (password_confirmation !== password) {
        errors.password = 'Пароли не совпадают';
        errors.password_confirmation = 'Пароли не совпадают';
    }
    return errors;
};

const registerFormValidators = {
    phone: [required(), maxLength(50)],
    email: [required(), maxLength(255), email()],
    full_name: [required(), maxLength(255)],
    password: [required(), maxLength(255)],
    password_confirmation: [required(), maxLength(255)],
    submit: submitValidator,
};

export { registerFormValidators };
