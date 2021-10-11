import * as React from 'react';
import { List, Datagrid, TextField, EmailField, TextInput, SelectInput, ReferenceInput } from 'react-admin';
import { userRoles } from '@app-constants';

const managerFilter = { role_id: userRoles.manager.id };

const parthnerFilters = [
    <TextInput label="ФИО" source="query" alwaysOn />,
    <ReferenceInput label="Менеджер" source="manager_id" reference="user" filter={managerFilter} alwaysOn>
        <SelectInput optionText="full_name" optionValue="id" />
    </ReferenceInput>,
];

export default function ParthnerList(props) {
    return (
        <List {...props} title="Партнеры" filters={parthnerFilters}>
            <Datagrid rowClick="show" isRowSelectable={() => false}>
                <TextField label="id" source="id" />
                <TextField label="ФИО" source="full_name" />
                <TextField label="Телефон" source="phone" />
                <EmailField label="Email" source="email" />
                <TextField label="Комментарий" source="comment" />
            </Datagrid>
        </List>
    );
}
