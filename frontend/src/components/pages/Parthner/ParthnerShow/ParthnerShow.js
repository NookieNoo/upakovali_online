import * as React from 'react';
import { Show, SimpleShowLayout, TextField, EmailField, RichTextField } from 'react-admin';

export default function ParhtnerShow(props) {
    return (
        <Show {...props}>
            <SimpleShowLayout>
                <TextField source="full_name" />
                <EmailField source="email" />
                <TextField source="phone" />
                <TextField label="Менеджер" source="manager.full_name" />
                <RichTextField source="comment" />
            </SimpleShowLayout>
        </Show>
    );
}
