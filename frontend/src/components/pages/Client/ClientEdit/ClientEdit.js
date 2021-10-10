import * as React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
import { editClientFormValidators } from 'helpers/validators';

export default function ClientEdit(props) {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput label="ФИО" source="full_name" validate={editClientFormValidators.full_name} />
                <TextInput label="Телефон" source="phone" validate={editClientFormValidators.phone} />
                <TextInput label="Email" source="email" validate={editClientFormValidators.email} />
                <TextInput label="Комментарий" source="comment" validate={editClientFormValidators.comment} />
            </SimpleForm>
        </Edit>
    );
}