import * as React from 'react';
import { Create, SimpleForm, TextInput, PasswordInput, SelectInput } from 'react-admin';
import { createUserFormValidators } from 'helpers/validators/userFormValidators';
import { userRoles } from '@app-constants';

export default function UserCreate(props) {
    return (
        <Create {...props}>
            <SimpleForm validate={createUserFormValidators.submit}>
                <TextInput source="full_name" validate={createUserFormValidators.full_name} />
                <TextInput source="email" validate={createUserFormValidators.email} />
                <TextInput source="phone" validate={createUserFormValidators.phone} />
                <PasswordInput source="password" validate={createUserFormValidators.password} />
                <PasswordInput source="password_confirmation" validate={createUserFormValidators.password} />
                <SelectInput
                    source="role_id"
                    choices={Object.values(userRoles)}
                    validate={createUserFormValidators.role_id}
                />
            </SimpleForm>
        </Create>
    );
}
