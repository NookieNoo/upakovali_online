import * as React from "react";
import { List, Datagrid, TextField, EmailField, useListContext } from 'react-admin';

export default function ClientList(props) {
    const {data} = useListContext();
    console.log('data', data);
    console.log('props', props);
    return <List {...props} title="Клиенты">
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="full_name" />
            <TextField source="phone" />
            <EmailField source="email" />
            <TextField source="comment" />
        </Datagrid>
    </List>
};
