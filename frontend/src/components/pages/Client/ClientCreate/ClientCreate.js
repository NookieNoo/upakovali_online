import * as React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { createClientFormValidators } from 'helpers/validators';
import { PhoneInput } from '@app-universal';

export default function ClientCreate(props) {
    return (
        <Create {...props} title="Создание клиента">
            <SimpleForm redirect="show">
                <TextInput label="ФИО" source="full_name" validate={createClientFormValidators.full_name} />
                <TextInput label="Email" source="email" validate={createClientFormValidators.email} />
                <PhoneInput label="Телефон" source="phone" validate={createClientFormValidators.phone} />
                <TextInput label="Комментарий" source="comment" validate={createClientFormValidators.comment} />
            </SimpleForm>
        </Create>
    );
}
