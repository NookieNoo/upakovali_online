import * as React from 'react';
import { List, TextField, EmailField, TextInput } from 'react-admin';
import CustomizableDatagrid from 'ra-customizable-datagrid';

const clientFilters = [<TextInput label="ФИО" source="query" alwaysOn />];

export default function ClientList(props) {
    return (
        <List {...props} title="Клиенты" filters={clientFilters}>
            <CustomizableDatagrid rowClick="show" isRowSelectable={() => false}>
                <TextField label="id" source="id" />
                <TextField label="ФИО" source="full_name" />
                <TextField label="Телефон" source="phone" />
                <EmailField label="Email" source="email" />
                <TextField label="Комментарий" source="comment" />
            </CustomizableDatagrid>
        </List>
    );
}
