import * as React from 'react';
import { List, Datagrid, TextField, EmailField } from 'react-admin';

export default function ClientList(props) {
    return (
        <List {...props} title="Клиенты">
            <Datagrid rowClick="show">
                <TextField label="id" source="id" />
                <TextField label="ФИО" source="full_name" />
                <TextField label="Телефон" source="phone" />
                <EmailField label="Email" source="email" />
                <TextField label="Комментарий" source="comment" />
            </Datagrid>
        </List>
    );
}
