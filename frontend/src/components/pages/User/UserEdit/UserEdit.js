import * as React from 'react';
import { Edit, SimpleForm, TextInput, PasswordInput, SelectInput, EmailField } from 'react-admin';
import { editUserFormValidators } from 'helpers/validators/userFormValidators';
import { userRoles } from '@app-constants';

export default function UserEdit(props) {
    const onSuccess = () => {
        console.log('success');
    };
    const onFailure = () => {
        console.log('onFailure');
    };

    const transform = (data) => ({
        ...data,
        role_id: data.role.id,
    });

    return (
        <Edit {...props} transform={transform}>
            <SimpleForm validate={editUserFormValidators.submit}>
                <TextInput source="full_name" validate={editUserFormValidators.full_name} />
                <EmailField source="email" />
                <TextInput source="phone" validate={editUserFormValidators.phone} />
                <PasswordInput source="password" />
                <PasswordInput source="password_confirmation" />
                <SelectInput source="role.id" choices={userRoles} validate={editUserFormValidators.role_id} />
            </SimpleForm>
        </Edit>
    );
}
