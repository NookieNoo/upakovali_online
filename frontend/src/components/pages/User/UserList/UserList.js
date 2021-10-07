import * as React from 'react';
import { List, Datagrid, TextField, EmailField } from 'react-admin';

export default function UserList(props) {
    return (
        <List {...props}>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="full_name" />
                <TextField source="phone" />
                <EmailField source="email" />
                <TextField source="comment" />
            </Datagrid>
        </List>
    );
}
