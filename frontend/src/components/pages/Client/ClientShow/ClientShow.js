import * as React from 'react';
import { Show, SimpleShowLayout, TextField, EmailField, RichTextField } from 'react-admin';

export default function ClientShow(props) {
    console.log('clientProps', props);
    return (
        <Show {...props}>
            <SimpleShowLayout>
                <TextField source="full_name" />
                <EmailField source="email" />
                <TextField source="phone" />
                <RichTextField source="comment" />
            </SimpleShowLayout>
        </Show>
    );
}
