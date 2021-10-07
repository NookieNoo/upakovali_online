import * as React from 'react';
import { Show, SimpleShowLayout, TextField, EmailField, RichTextField, UrlField } from 'react-admin';

export default function UserShow(props) {
    return (
        <Show {...props}>
            <SimpleShowLayout>
                <TextField source="full_name" />
                <EmailField source="email" />
                <TextField source="phone" />
                <TextField source="role.name" />
            </SimpleShowLayout>
        </Show>
    );
}
