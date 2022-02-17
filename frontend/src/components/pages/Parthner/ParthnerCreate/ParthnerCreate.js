import * as React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { createParthnerFormValidators } from '@app-helpers';
import { userRoles } from '@app-constants';
import { AutocompleteWithRef } from '@app-universal';
import { PhoneInput } from '@app-universal';

const managerFilter = { role_id: userRoles.manager.id };

export default function ParthnerCreate(props) {
    return (
        <Create {...props} title="Создание партнера">
            <SimpleForm redirect="show">
                <TextInput label="ФИО" source="full_name" validate={createParthnerFormValidators.full_name} />
                <TextInput label="Email" source="email" validate={createParthnerFormValidators.email} />
                <PhoneInput label="Телефон" source="phone" validate={createParthnerFormValidators.phone} />
                <TextInput label="Комментарий" source="comment" validate={createParthnerFormValidators.comment} />
                <AutocompleteWithRef
                    label="Менеджер"
                    source="manager_id"
                    reference="user"
                    filter={managerFilter}
                    validate={createParthnerFormValidators.manager_id}
                />
            </SimpleForm>
        </Create>
    );
}
