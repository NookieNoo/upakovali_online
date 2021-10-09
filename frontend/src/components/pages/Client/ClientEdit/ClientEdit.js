import * as React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
import { editClientFormValidators } from 'helpers/validators';

export default function ClientEdit(props) {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput source="full_name" validate={editClientFormValidators.full_name} />
                <TextInput source="phone" validate={editClientFormValidators.phone} />
                <TextInput source="email" validate={editClientFormValidators.email} />
                <TextInput source="comment" validate={editClientFormValidators.comment} />
            </SimpleForm>
        </Edit>
    );
}
