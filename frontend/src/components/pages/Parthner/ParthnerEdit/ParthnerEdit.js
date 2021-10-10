import * as React from 'react';
import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput } from 'react-admin';
import { editParthnerFormValidators } from '@app-helpers';
import { userRoles } from '@app-constants';

const managerFilter = { role_id: userRoles.manager.id };

export default function ParthnerEdit(props) {
    return (
        <Edit {...props} mutationMode='pessimistic'>
            <SimpleForm>
                <TextInput source="full_name" validate={editParthnerFormValidators.full_name} />
                <TextInput source="email" validate={editParthnerFormValidators.email} />
                <TextInput source="phone" validate={editParthnerFormValidators.phone} />
                <TextInput source="comment" validate={editParthnerFormValidators.comment} />
                <ReferenceInput label="Менеджер" source="manager_id" reference="user" filter={managerFilter}>
                    <SelectInput optionText="full_name" optionValue="id" validate={editParthnerFormValidators.manager_id} />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    );
}
