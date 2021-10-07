import * as React from 'react';
import { List, Datagrid, TextField, EmailField } from 'react-admin';

export default function ParthnerList(props) {
    return (
        <List {...props}>
            <Datagrid rowClick="show">
                <TextField source="id" />
                <TextField source="full_name" />
                <TextField source="phone" />
                <EmailField source="email" />
                <TextField source="comment" />
            </Datagrid>
        </List>
    );
}
