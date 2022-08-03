import * as React from 'react';
import { List, DateField, TextField, TextInput, DateInput, EditButton, ReferenceInput, SelectInput } from 'react-admin';
import CustomizableDatagrid from 'ra-customizable-datagrid';
import { useHasAccess } from '@app-hooks';

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

    return (
        // <List {...props} title="Заказы" filters={filters}>
        <List {...props} title="Прайсы" filters={priceFilters} bulkActionButtons={false}>
            <CustomizableDatagrid rowClick="show" defaultColumns={defaultColumns} isRowSelectable={() => false}>
                <TextField label="id" source="id" />
                <TextField label="Партнер" source="parthner.full_name" />
                <TextField label="Название" source="name" />
                <DateField label="Действует с" source="start" />
                <DateField label="Действует до" source="end" />
                {canEdit ? <EditButton label={null} /> : <span></span>}
            </CustomizableDatagrid>
        </List>
    );
}
