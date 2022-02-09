import { required, maxLength, email } from 'react-admin';

const passwordRestoreFormValidators = {
    email: [required(), maxLength(255), email()],
};

export { passwordRestoreFormValidators };
