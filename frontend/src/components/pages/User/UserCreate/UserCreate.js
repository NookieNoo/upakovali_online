import * as React from 'react';
import { Create, SimpleForm, TextInput, PasswordInput, SelectInput } from 'react-admin';
import { createUserFormValidators } from 'helpers/validators/userFormValidators';
import { userRoles } from '@app-constants';

export default function UserCreate(props) {
    return (
        <Create {...props} title="Создание пользователя">
            <SimpleForm validate={createUserFormValidators.submit}>
                <TextInput label="ФИО" source="full_name" validate={createUserFormValidators.full_name} />
                <TextInput label="Email" source="email" validate={createUserFormValidators.email} />
                <TextInput label="Телефон" source="phone" validate={createUserFormValidators.phone} />
                <PasswordInput label="Пароль" source="password" validate={createUserFormValidators.password} />
                <PasswordInput
                    label="Подтвердите пароль"
                    source="password_confirmation"
                    validate={createUserFormValidators.password}
                />
                <SelectInput
                    label="Роль"
                    source="role_id"
                    choices={Object.values(userRoles)}
                    validate={createUserFormValidators.role_id}
                />
            </SimpleForm>
        </Create>
    );
}
