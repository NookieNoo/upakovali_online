import * as React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
import { editClientFormValidators } from 'helpers/validators';
import { PhoneInput } from '@app-universal';

export default function ClientEdit(props) {
    return (
        <Edit {...props} mutationMode="pessimistic">
            <SimpleForm redirect="show">
                <TextInput label="ФИО" source="full_name" validate={editClientFormValidators.full_name} />
                <PhoneInput label="Телефон" source="phone" validate={editClientFormValidators.phone} />
                <TextInput label="Email" source="email" validate={editClientFormValidators.email} />
                <TextInput label="Комментарий" source="comment" validate={editClientFormValidators.comment} />
            </SimpleForm>
        </Edit>
    );
}
