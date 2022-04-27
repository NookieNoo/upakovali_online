import * as React from 'react';
import { List, TextField, EmailField, TextInput, SelectInput, ReferenceInput } from 'react-admin';
import CustomizableDatagrid from 'ra-customizable-datagrid';
import { userRoles } from '@app-constants';

const managerFilter = { role_id: userRoles.manager.id };

const parthnerFilters = [
    <TextInput label="Название" source="query" alwaysOn />,
    <ReferenceInput label="Менеджер" source="manager_id" reference="user" filter={managerFilter} alwaysOn>
        <SelectInput optionText="full_name" optionValue="id" />
    </ReferenceInput>,
];

export default function ParthnerList(props) {
    return (
        <List {...props} title="Партнеры" filters={parthnerFilters}>
            <CustomizableDatagrid rowClick="show" isRowSelectable={() => false}>
                <TextField label="id" source="id" />
                <TextField label="Название" source="full_name" />
                <TextField label="Телефон" source="phone" />
                <EmailField label="Email" source="email" />
                <TextField label="Комментарий" source="comment" />
            </CustomizableDatagrid>
        </List>
    );
}
