import * as React from 'react';
import { Show, SimpleShowLayout, TextField, EmailField, RichTextField, UrlField } from 'react-admin';

export default function ParhtnerShow(props) {
    return (
        <Show {...props}>
            <SimpleShowLayout>
                <TextField source="full_name" />
                <EmailField source="email" />
                <TextField source="phone" />
                <RichTextField source="comment" />
                <UrlField source="manager.id" />
            </SimpleShowLayout>
        </Show>
    );
}
