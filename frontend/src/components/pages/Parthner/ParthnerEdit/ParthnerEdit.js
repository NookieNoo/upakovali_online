import * as React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
import { editParthnerFormValidators } from '@app-helpers';
import { userRoles } from '@app-constants';
import { AutocompleteWithRef } from '@app-universal';

const managerFilter = { role_id: userRoles.manager.id };

export default function ParthnerEdit(props) {
    return (
        <Edit {...props} mutationMode="pessimistic">
            <SimpleForm redirect="show">
                <TextInput label="ФИО" source="full_name" validate={editParthnerFormValidators.full_name} />
                <TextInput label="Email" source="email" validate={editParthnerFormValidators.email} />
                <TextInput label="Телефон" source="phone" validate={editParthnerFormValidators.phone} />
                <TextInput label="Комментарий" source="comment" validate={editParthnerFormValidators.comment} />
                <AutocompleteWithRef
                    label="Менеджер"
                    source="manager_id"
                    reference="user"
                    filter={managerFilter}
                    validate={editParthnerFormValidators.manager_id}
                />
            </SimpleForm>
        </Edit>
    );
}
