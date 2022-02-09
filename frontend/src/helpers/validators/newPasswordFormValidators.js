import { required, maxLength, minLength, email } from 'react-admin';

const submitValidator = ({ password, password_confirmation }) => {
    const errors = {};

    if (password_confirmation !== password) {
        errors.password = 'Пароли не совпадают';
        errors.password_confirmation = 'Пароли не совпадают';
    }
    return errors;
};

const newPasswordFormValidators = {
    email: [required(), maxLength(255), email()],
    password: [required(), maxLength(255), minLength(4)],
    password_confirmation: [required(), maxLength(255), minLength(4)],
    submit: submitValidator,
};

export { newPasswordFormValidators };
