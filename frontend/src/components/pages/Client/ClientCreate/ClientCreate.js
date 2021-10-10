import * as React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { createClientFormValidators } from 'helpers/validators';

export default function ClientCreate(props) {
    return (
        <Create {...props} title="Создание клиента">
            <SimpleForm>
                <TextInput label="ФИО" source="full_name" validate={createClientFormValidators.full_name} />
                <TextInput label="Email" source="email" validate={createClientFormValidators.email} />
                <TextInput label="Телефон" source="phone" validate={createClientFormValidators.phone} />
                <TextInput label="Комментарий" source="comment" validate={createClientFormValidators.comment} />
            </SimpleForm>
        </Create>
    );
}
