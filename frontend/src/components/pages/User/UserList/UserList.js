import * as React from 'react';
import { List, TextField, EmailField, TextInput, ReferenceInput, SelectInput, BooleanInput } from 'react-admin';
import CustomizableDatagrid from 'ra-customizable-datagrid';

const userFilters = [
    <TextInput label="ФИО" source="query" alwaysOn />,
    <ReferenceInput label="Роль" source="role_id" reference="role" alwaysOn>
        <SelectInput optionText="visible_name" optionValue="id" />
    </ReferenceInput>,
];

export default function UserList(props) {
    return (
        <List {...props} title="Пользователи" filters={userFilters}>
            <CustomizableDatagrid rowClick="show" isRowSelectable={() => false}>
                <TextField label="id" source="id" />
                <TextField label="ФИО" source="full_name" />
                <TextField label="Телефон" source="phone" />
                <EmailField label="Email" source="email" />
                <TextField label="Роль" source="role.visible_name" />
                <TextField label="Комментарий" source="comment" />
            </CustomizableDatagrid>
        </List>
    );
}
