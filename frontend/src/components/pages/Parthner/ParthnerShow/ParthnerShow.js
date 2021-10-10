import * as React from 'react';
import { Show, SimpleShowLayout, TextField, EmailField, RichTextField } from 'react-admin';

export default function ParhtnerShow(props) {
    return (
        <Show {...props}>
            <SimpleShowLayout>
                <TextField label="ФИО" source="full_name" />
                <EmailField label="Email" source="email" />
                <TextField label="Телефон" source="phone" />
                <TextField label="Менеджер" source="manager.full_name" />
                <RichTextField label="Комментарий" source="comment" />
            </SimpleShowLayout>
        </Show>
    );
}
