import * as React from 'react';
import { List, Datagrid, TextField, EmailField } from 'react-admin';

export default function OrderList(props) {
    return (
        <List {...props}>
            <Datagrid rowClick="edit">
                <TextField source="id" title="fsd" />
                <TextField source="client.full_name" />
                <TextField source="parthner.full_name" />
                <TextField source="source.name" />
                <TextField source="comment" />
            </Datagrid>
        </List>
    );
}
