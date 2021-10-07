import * as React from "react";
import { List, Datagrid, TextField, EmailField, useListContext } from 'react-admin';

export const ClientList = props => {
    const {data} = useListContext();
    console.log('data', data);
    console.log('props', props);
    return <List {...props} title="Клиенты">
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="full_name" />
            <TextField source="phone" />
            <EmailField source="email" />
            <TextField source="comment" />
        </Datagrid>
    </List>
};
