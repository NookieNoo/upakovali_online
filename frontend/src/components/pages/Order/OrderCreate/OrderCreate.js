import * as React from 'react';
import { Create, SimpleForm, TextInput, ReferenceInput, SelectInput, BooleanInput, DateTimeInput } from 'react-admin';
import { userRoles } from '@app-constants';

const courierFilter = { role_id: userRoles.courier.id };
const masterFilter = { role_id: userRoles.master.id };

export default function OrderCreate(props) {
    return (
        <Create {...props} title="Создание заказа">
            <SimpleForm>
                <ReferenceInput label="Источник" source="source_id" reference="source">
                    <SelectInput optionText="name" optionValue="id" />
                </ReferenceInput>
                <ReferenceInput label="Партнер" source="parthner_id" reference="parthner">
                    <SelectInput optionText="full_name" optionValue="id" />
                </ReferenceInput>
                <TextInput source="external_number" validate={[]} label="Внешний номер" />
                <ReferenceInput label="Клиент" source="client_id" reference="client">
                    <SelectInput optionText="full_name" optionValue="id" />
                </ReferenceInput>
                <ReferenceInput label="Мастерская" source="workshop_id" reference="workshop">
                    <SelectInput optionText="address" optionValue="id" />
                </ReferenceInput>

                {/* Размер из прайса */}

                <ReferenceInput label="Кому" source="addressee_id" reference="addressee">
                    <SelectInput optionText="name" optionValue="id" />
                </ReferenceInput>

                <BooleanInput label="Забор" source="is_pickupable" />
                <ReferenceInput label="Точка забора товара" source="pick_up_point_id" reference="workshop">
                    <SelectInput optionText="address" optionValue="id" />
                </ReferenceInput>
                <TextInput source="pick_up_address" label="Точка забора товара" validate={[]} />

                <BooleanInput label="Доставка" source="is_deliverable" />
                <ReferenceInput label="Точка выдачи товара" source="delivery_point_id" reference="workshop">
                    <SelectInput optionText="address" optionValue="id" />
                </ReferenceInput>
                <TextInput source="delivery_address" label="Точка выдачи товара" validate={[]} />

                <DateTimeInput source="receiving_date" label="Время приема" />
                <DateTimeInput source="issue_date" label="Время выдачи" />

                <TextInput source="comment" validate={[]} />

                <ReferenceInput
                    label="Курьер принимающий"
                    source="courier_receiver_id"
                    reference="user"
                    filter={courierFilter}
                >
                    <SelectInput optionText="full_name" optionValue="id" />
                </ReferenceInput>

                <ReferenceInput
                    label="Курьер выдающий"
                    source="courier_issuer_id"
                    reference="user"
                    filter={courierFilter}
                >
                    <SelectInput optionText="full_name" optionValue="id" />
                </ReferenceInput>

                {/* Цена */}

                <BooleanInput label="Оплачено" source="isPaid" />
                <ReferenceInput label="Мастер" source="master_id" reference="user" filter={masterFilter}>
                    <SelectInput optionText="full_name" optionValue="id" />
                </ReferenceInput>
                <ReferenceInput label="Получатель" source="receiver_id" reference="client">
                    <SelectInput optionText="full_name" optionValue="id" />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    );
}
