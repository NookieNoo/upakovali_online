import { useACL } from 'ra-access-control-lists';
import * as React from 'react';
import { List, Datagrid, TextField, EmailField, TextInput } from 'react-admin';

const clientFilters = [<TextInput label="ФИО" source="query" alwaysOn />];

export default function ClientList(props) {
    const { enabled, show } = useACL('order');
    console.log('canEdit', show, enabled);
    return (
        <List {...props} title="Клиенты" filters={clientFilters}>
            <Datagrid rowClick="show" isRowSelectable={() => false}>
                <TextField label="id" source="id" />
                <TextField label="ФИО" source="full_name" />
                <TextField label="Телефон" source="phone" />
                <EmailField label="Email" source="email" />
                <TextField label="Комментарий" source="comment" />
            </Datagrid>
        </List>
    );
}
