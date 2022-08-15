import * as React from 'react';
import { List, DateField, TextField, TextInput, SimpleList, DateInput, EditButton, ReferenceInput, SelectInput } from 'react-admin';
import CustomizableDatagrid from 'components/overriding/ra-customizable-datagrid';
import { useHasAccess } from '@app-hooks';
import { useMediaQuery } from '@material-ui/core';

const defaultColumns = ['id', 'name', 'start', 'end', 'parthner.full_name'];

const priceFilters = [
    <TextInput label="Название" source="query" alwaysOn />,
    <ReferenceInput label="Партнер" source="parthner_id" reference="parthner">
        <SelectInput optionText="full_name" optionValue="id" />
    </ReferenceInput>,
    <DateInput label="Действует с (начало)" source="start_from" />,
    <DateInput label="Действует с (конец)" source="start_to" />,
    <DateInput label="Действует до (начало)" source="end_from" />,
    <DateInput label="Действует до (конец)" source="end_to" />,
];

export default function PriceList(props) {
    const { resource } = props;
    const { edit: canEdit } = useHasAccess(resource);
    const isXSmall = useMediaQuery((theme) => theme.breakpoints.down('xs'));

    return (
        // <List {...props} title="Заказы" filters={filters}
        <List {...props} title="Прайсы" filters={priceFilters} bulkActionButtons={false}>
            {isXSmall ? (
                <SimpleList
                    primaryText={(record = {}) => `[${record.id}] ${_.get(record.parthner, ['full_name'], 'Партнер отсутствует')}`}
                    secondaryText={(record) => 
                        `Название: ${record.name}\n` +
                        `Действует с: ${record.start}\n` +
                        `Действует до: ${record.end}`
                    }
                    rowStyle={() => ({ whiteSpace: 'pre-line'})}
                    linkType="show"  
                />
            ) : (
                <CustomizableDatagrid rowClick="show" defaultColumns={defaultColumns} isRowSelectable={() => false}>
                    <TextField label="id" source="id" />
                    <TextField label="Партнер" source="parthner.full_name" />
                    <TextField label="Название" source="name" />
                    <DateField label="Действует с" source="start" />
                    <DateField label="Действует до" source="end" />
                    {canEdit ? <EditButton label={null} /> : <span></span>}
                </CustomizableDatagrid>
            ) 
        }
        </List>
    );
}
