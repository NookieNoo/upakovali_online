import * as React from 'react';
import { List, Datagrid, TextField, BooleanField, ChipField, EditButton, useGetIdentity } from 'react-admin';
import { userRoles } from '@app-constants';
import { useHasAccess } from '@app-hooks';
import { adminFilters, courierFilters, masterFilters } from './filters';

export default function OrderList(props) {
    const { resource } = props;
    const { edit: canEdit } = useHasAccess(resource);
    const { identity } = useGetIdentity();

    let filters = adminFilters;
    const isCourier = identity?.role.id === userRoles.courier.id;
    const isMaster = identity?.role.id === userRoles.master.id;

    if (isCourier) filters = courierFilters;
    if (isMaster) filters = masterFilters;

    return (
        <List {...props} title="Заказы" filters={filters}>
            <Datagrid rowClick="show" isRowSelectable={() => false}>
                <TextField label="id" source="id" />
                <ChipField label="Статус" source="order_status.name" />
                <TextField label="Клиент" source="client.full_name" />
                <TextField label="Партнер" source="parthner.full_name" />
                <TextField label="Источник" source="source.name" />
                <BooleanField label="Оплачено" source="isPaid" />
                <TextField label="Комментарий" source="comment" />
                {canEdit && <EditButton label={null} />}
            </Datagrid>
        </List>
    );
}
