import * as React from 'react';
import { Show, SimpleShowLayout, TextField, EmailField, RichTextField, UrlField } from 'react-admin';

export default function UserShow(props) {
    return (
        <Show {...props}>
            <SimpleShowLayout>
                <TextField label="ФИО" source="full_name" />
                <EmailField label="Email" source="email" />
                <TextField label="Телефон" source="phone" />
                <TextField label="Роль" source="role.name" />
            </SimpleShowLayout>
        </Show>
    );
}
