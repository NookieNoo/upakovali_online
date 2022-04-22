import * as React from 'react';
import { List, DateField, TextField, BooleanField, ChipField, EditButton, useGetIdentity } from 'react-admin';
import CustomizableDatagrid from 'ra-customizable-datagrid';
import { userRoles } from '@app-constants';
import { useHasAccess } from '@app-hooks';
import { adminFilters, courierFilters, masterFilters } from './filters';

const defaultColumns = [
    'id',
    'source.name',
    'parthner.full_name',
    'client.full_name',
    'workshop.address',
    'is_pickupable',
    'is_deliverable',
    'isPaid',
    'master.full_name',
    'receiver.full_name',
    'order_status.name',
];

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
            <CustomizableDatagrid rowClick="show" defaultColumns={defaultColumns} isRowSelectable={() => false}>
                <TextField label="id" source="id" />
                <TextField label="Источник" source="source.name" />
                <TextField label="Партнер" source="parthner.full_name" />
                <TextField label="Внешний №" source="external_number" />
                <TextField label="Клиент" source="client.full_name" />
                <TextField label="Мастерская" source="workshop.address" />
                <BooleanField label="Забор" source="is_pickupable" />
                <BooleanField label="Доставка" source="is_deliverable" />
                {/* Здесь должен быть адрес приема(но он берется из разных источников) */}
                <DateField label="Дата приема" source="receiving_date" />
                <DateField label="Дата выдачи" source="issue_date" />
                <TextField label="Комментарий" source="comment" />
                <TextField label="Курьер приема" source="courier_receiver.full_name" />
                <TextField label="Курьер выдачи" source="courier_issuer.full_name" />
                <TextField label="Сумма" source="total" />
                <BooleanField label="Оплачено" source="isPaid" />
                <TextField label="Мастер" source="master.full_name" />
                <TextField label="Получатель" source="receiver.full_name" />

                <ChipField label="Статус" source="order_status.name" />

                {canEdit ? <EditButton label={null} /> : <span></span>}
            </CustomizableDatagrid>
        </List>
    );
}
