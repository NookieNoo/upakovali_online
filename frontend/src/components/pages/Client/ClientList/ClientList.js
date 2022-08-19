import * as React from 'react';
import { List, TextField, EmailField, TextInput, SimpleList } from 'react-admin';
import { useMediaQuery } from '@material-ui/core';
import CustomizableDatagrid from 'components/overriding/ra-customizable-datagrid';

const clientFilters = [<TextInput label="ФИО" source="query" alwaysOn />];

export default function ClientList(props) {
    const isXSmall = useMediaQuery((theme) => theme.breakpoints.down('xs'));

    return (
        <List {...props} title="Клиенты" filters={clientFilters} bulkActionButtons={false}>
            {isXSmall ? (
                <SimpleList 
                    primaryText={(record) => `[${record.id}] ${record.full_name}`}
                    secondaryText={(record) => `${record.phone} ${record.email}`}
                    tertiaryText={(record) => record.comment}
                    linkType="show"
                />
            ) : (
                <CustomizableDatagrid rowClick="show" isRowSelectable={() => false}>
                    <TextField label="id" source="id" />
                    <TextField label="ФИО" source="full_name" />
                    <TextField label="Телефон" source="phone" />
                    <EmailField label="Email" source="email" />
                    <TextField label="Комментарий" source="comment" />
                </CustomizableDatagrid>
            )}
        </List>
    );
}
