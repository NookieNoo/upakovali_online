import * as React from 'react';
import { List, TextField, EmailField, TextInput, SelectInput, ReferenceInput, SimpleList } from 'react-admin';
import CustomizableDatagrid from 'components/overriding/ra-customizable-datagrid';
import { useMediaQuery } from '@material-ui/core';

const parthnerFilters = [
    <TextInput label="Название" source="query" alwaysOn />,
    <TextInput label="Менеджер" source="manager" alwaysOn />,
];

export default function ParthnerList(props) {
    const isXSmall = useMediaQuery((theme) => theme.breakpoints.down('xs'));

    return (
        <List {...props} title="Партнеры" filters={parthnerFilters} bulkActionButtons={false}>
            {isXSmall ? (
                <SimpleList
                    primaryText={(record) => `[${record.id}] ${record.full_name}`}
                    secondaryText={(record) => 
                        `Менеджер: ${record.manager}\n` +
                        `Телефон: ${record.phone}\n` +
                        `Почта: ${record.email}\n` +
                        `Комментарий: ${record.comment}`
                    }   
                    rowStyle={() => ({ whiteSpace: 'pre-line'})}
                    linkType="show" 
                />
            ) : (
                <CustomizableDatagrid rowClick="show" isRowSelectable={() => false}>
                    <TextField label="id" source="id" />
                    <TextField label="Название" source="full_name" />
                    <TextField label="Телефон" source="phone" />
                    <TextField label="Менеджер" source="manager" />
                    <EmailField label="Email" source="email" />
                    <TextField label="Комментарий" source="comment" />
                </CustomizableDatagrid>
            )}
        </List>
    );
}
