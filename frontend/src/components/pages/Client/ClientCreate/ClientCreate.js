import * as React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { createClientFormValidators } from 'helpers/validators';

export default function ClientCreate(props) {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="full_name" validate={createClientFormValidators.full_name} />
                <TextInput source="email" validate={createClientFormValidators.email} />
                <TextInput source="phone" validate={createClientFormValidators.phone} />
                <TextInput source="comment" validate={createClientFormValidators.comment} />
            </SimpleForm>
        </Create>
    );
}
