import * as React from 'react';
import { List, Datagrid, TextField, EmailField } from 'react-admin';

export default function OrderList(props) {
    return (
        <List {...props} title="Заказы">
            <Datagrid rowClick="show">
                <TextField label="id" source="id" />
                <TextField label="Клиент" source="client.full_name" />
                <TextField label="Партнер" source="parthner.full_name" />
                <TextField label="Источник" source="source.name" />
                <TextField label="Комментарий" source="comment" />
            </Datagrid>
        </List>
    );
}
