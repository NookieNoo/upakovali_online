import * as React from 'react';
import { List, TextField, EmailField, TextInput, ReferenceInput, SelectInput, SimpleList } from 'react-admin';
import { useMediaQuery } from '@material-ui/core';
import CustomizableDatagrid from 'components/overriding/ra-customizable-datagrid';

const userFilters = [
    <TextInput label="ФИО" source="query" alwaysOn />,
    <ReferenceInput label="Роль" source="role_id" reference="role" alwaysOn>
        <SelectInput optionText="visible_name" optionValue="id" />
    </ReferenceInput>,
];

export default function UserList(props) {
    const isXSmall = useMediaQuery((theme) => theme.breakpoints.down('xs'));
    return (
        <List {...props} title="Пользователи" filters={userFilters} bulkActionButtons={false}>
            {isXSmall ? (
                <SimpleList
                    primaryText={(record) => `[${record.role.visible_name}] ${record.full_name}`}
                    secondaryText={(record) => record.phone}
                    tertiaryText={(record) => record.email}
                    linkType={(record) => (record.canEdit ? 'edit' : 'show')}
                />
            ) : (
                <CustomizableDatagrid rowClick="show" isRowSelectable={() => false}>
                    <TextField label="id" source="id" />
                    <TextField label="ФИО" source="full_name" />
                    <TextField label="Телефон" source="phone" />
                    <EmailField label="Email" source="email" />
                    <TextField label="Роль" source="role.visible_name" />
                    <TextField label="Комментарий" source="comment" />
                </CustomizableDatagrid>
            )}
        </List>
    );
}
