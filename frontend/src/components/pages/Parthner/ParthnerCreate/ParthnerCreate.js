import * as React from 'react';
import { Create, SimpleForm, TextInput, ReferenceInput, SelectInput } from 'react-admin';
import { createParthnerFormValidators } from '@app-helpers';
import { userRoles } from '@app-constants';

const managerFilter = { role_id: userRoles.manager.id };

export default function ParthnerCreate(props) {
    return (
        <Create {...props} title="Создание партнера">
            <SimpleForm>
                <TextInput label="ФИО" source="full_name" validate={createParthnerFormValidators.full_name} />
                <TextInput label="Email" source="email" validate={createParthnerFormValidators.email} />
                <TextInput label="Телефон" source="phone" validate={createParthnerFormValidators.phone} />
                <TextInput label="Комментарий" source="comment" validate={createParthnerFormValidators.comment} />
                <ReferenceInput label="Менеджер" source="manager_id" reference="user" filter={managerFilter} validate={createParthnerFormValidators.manager_id}>
                    <SelectInput optionText="full_name" optionValue="id" />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    );
}
