import * as React from 'react';
import { Create, SimpleForm, TextInput, ReferenceInput, SelectInput } from 'react-admin';
import { createUserFormValidators } from 'helpers/validators/userFormValidators';
import { userRoles } from '@app-constants';

const managerFilter = { role_id: userRoles.manager.id };

export default function ParthnerCreate(props) {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="full_name" validate={[]} />
                <TextInput source="email" validate={[]} />
                <TextInput source="phone" validate={[]} />
                <TextInput source="comment" validate={[]} />
                <ReferenceInput label="Менеджер" source="manager_id" reference="user" filter={managerFilter}>
                    <SelectInput optionText="full_name" optionValue="id" />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    );
}
