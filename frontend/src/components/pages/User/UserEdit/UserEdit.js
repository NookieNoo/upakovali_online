import * as React from 'react';
import { Edit, SimpleForm, TextInput, PasswordInput, SelectInput, EmailField, BooleanInput } from 'react-admin';
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
        <Edit {...props} transform={transform} mutationMode="pessimistic">
            <SimpleForm validate={editUserFormValidators.submit}>
                <TextInput label="ФИО" source="full_name" validate={editUserFormValidators.full_name} />
                <EmailField label="Email" source="email" />
                <TextInput label="Телефон" source="phone" validate={editUserFormValidators.phone} />
                <PasswordInput label="Пароль" source="password" />
                <PasswordInput label="Подтверждение пароля" source="password_confirmation" />
                <SelectInput
                    label="Роль"
                    source="role.id"
                    choices={Object.values(userRoles)}
                    optionText='visible_name'
                    validate={editUserFormValidators.role_id}
                />
                <BooleanInput label="Активен?" source="is_active" />
            </SimpleForm>
        </Edit>
    );
}
