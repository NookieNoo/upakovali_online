import * as React from 'react';
import { List, TextField, EmailField, TextInput, SelectInput, ReferenceInput } from 'react-admin';
import CustomizableDatagrid from 'components/overriding/ra-customizable-datagrid';

const parthnerFilters = [
    <TextInput label="Название" source="query" alwaysOn />,
    <TextInput label="Менеджер" source="manager" alwaysOn />,
];

export default function ParthnerList(props) {
    return (
        <List {...props} title="Партнеры" filters={parthnerFilters} bulkActionButtons={false}>
            <CustomizableDatagrid rowClick="show" isRowSelectable={() => false}>
                <TextField label="id" source="id" />
                <TextField label="Название" source="full_name" />
                <TextField label="Телефон" source="phone" />
                <TextField label="Менеджер" source="manager" />
                <EmailField label="Email" source="email" />
                <TextField label="Комментарий" source="comment" />
            </CustomizableDatagrid>
        </List>
    );
}
