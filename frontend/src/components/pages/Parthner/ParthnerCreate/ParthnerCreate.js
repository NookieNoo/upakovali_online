import * as React from 'react';
import { Create, SimpleForm, TextInput, ReferenceInput, SelectInput } from 'react-admin';
import { createUserFormValidators } from 'helpers/validators/userFormValidators';
import { userRoles } from '@app-constants';

const managerFilter = { role_id: userRoles.manager.id };

export default function ParthnerCreate(props) {
    return (
        <Create {...props} title="Создание партнера">
            <SimpleForm>
                <TextInput label="ФИО" source="full_name" validate={[]} />
                <TextInput label="Email" source="email" validate={[]} />
                <TextInput label="Телефон" source="phone" validate={[]} />
                <TextInput label="Комментарий" source="comment" validate={[]} />
                <ReferenceInput label="Менеджер" source="manager_id" reference="user" filter={managerFilter}>
                    <SelectInput optionText="full_name" optionValue="id" />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    );
}
