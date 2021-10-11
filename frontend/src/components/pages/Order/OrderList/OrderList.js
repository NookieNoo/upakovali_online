import * as React from 'react';
import {
    List,
    Datagrid,
    TextField,
    TextInput,
    ReferenceInput,
    SelectInput,
    BooleanInput,
    BooleanField,
} from 'react-admin';
import { userRoles } from '@app-constants';

const courierFilter = { role_id: userRoles.courier.id };
const masterFilter = { role_id: userRoles.master.id };

const orderFilters = [
    <ReferenceInput label="Источник" source="source_id" reference="source" alwaysOn>
        <SelectInput optionText="name" optionValue="id" />
    </ReferenceInput>,
    <ReferenceInput label="Партнер" source="parthner_id" reference="parthner" alwaysOn>
        <SelectInput optionText="full_name" optionValue="id" />
    </ReferenceInput>,
    <TextInput source="external_number" label="Внешний номер" />,
    <ReferenceInput label="Клиент" source="client_id" reference="client">
        <SelectInput optionText="full_name" optionValue="id" />
    </ReferenceInput>,
    <ReferenceInput label="Мастерская" source="workshop_id" reference="workshop">
        <SelectInput optionText="address" optionValue="id" />
    </ReferenceInput>,
    <ReferenceInput label="Кому" source="addressee_id" reference="addressee" alwaysOn>
        <SelectInput optionText="name" optionValue="id" />
    </ReferenceInput>,
    <ReferenceInput label="Курьер принимающий" source="courier_receiver_id" reference="user" filter={courierFilter}>
        <SelectInput optionText="full_name" optionValue="id" />
    </ReferenceInput>,
    <ReferenceInput label="Курьер выдающий" source="courier_issuer_id" reference="user" filter={courierFilter}>
        <SelectInput optionText="full_name" optionValue="id" />
    </ReferenceInput>,
    <BooleanInput label="Оплачено" source="isPaid" />,
    <ReferenceInput label="Мастер" source="master_id" reference="user" filter={masterFilter}>
        <SelectInput optionText="full_name" optionValue="id" />
    </ReferenceInput>,
    <ReferenceInput label="Получатель" source="receiver_id" reference="client">
        <SelectInput optionText="full_name" optionValue="id" />
    </ReferenceInput>,
];

export default function OrderList(props) {
    return (
        <List {...props} title="Заказы" filters={orderFilters}>
            <Datagrid rowClick="show" isRowSelectable={() => false}>
                <TextField label="id" source="id" />
                <TextField label="Клиент" source="client.full_name" />
                <TextField label="Партнер" source="parthner.full_name" />
                <TextField label="Источник" source="source.name" />
                <BooleanField label="Оплачено" source="isPaid" />
                <TextField label="Комментарий" source="comment" />
            </Datagrid>
        </List>
    );
}
