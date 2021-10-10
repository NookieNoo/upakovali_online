import * as React from 'react';
import { Create, SimpleForm, TextInput, ReferenceInput, SelectInput, BooleanInput, DateTimeInput } from 'react-admin';
import { userRoles } from '@app-constants';
import { createOrderFormValidators } from '@app-helpers';

const courierFilter = { role_id: userRoles.courier.id };
const masterFilter = { role_id: userRoles.master.id };

export default function OrderCreate(props) {
    return (
        <Create {...props} title="Создание заказа">
            <SimpleForm>
                <ReferenceInput label="Источник" source="source_id" reference="source">
                    <SelectInput optionText="name" optionValue="id" validate={createOrderFormValidators.source_id} />
                </ReferenceInput>
                <ReferenceInput label="Партнер" source="parthner_id" reference="parthner">
                    <SelectInput
                        optionText="full_name"
                        optionValue="id"
                        validate={createOrderFormValidators.parthner_id}
                    />
                </ReferenceInput>
                <TextInput
                    source="external_number"
                    label="Внешний номер"
                    validate={createOrderFormValidators.external_number}
                />
                <ReferenceInput label="Клиент" source="client_id" reference="client">
                    <SelectInput
                        optionText="full_name"
                        optionValue="id"
                        validate={createOrderFormValidators.client_id}
                    />
                </ReferenceInput>
                <ReferenceInput label="Мастерская" source="workshop_id" reference="workshop">
                    <SelectInput
                        optionText="address"
                        optionValue="id"
                        validate={createOrderFormValidators.workshop_id}
                    />
                </ReferenceInput>

                {/* Размер из прайса */}

                <ReferenceInput label="Кому" source="addressee_id" reference="addressee">
                    <SelectInput optionText="name" optionValue="id" validate={createOrderFormValidators.addressee_id} />
                </ReferenceInput>

                <BooleanInput label="Забор" source="is_pickupable" validate={createOrderFormValidators.is_pickupable} />
                <ReferenceInput label="Точка забора товара" source="pick_up_point_id" reference="workshop">
                    <SelectInput
                        optionText="address"
                        optionValue="id"
                        validate={createOrderFormValidators.pick_up_point_id}
                    />
                </ReferenceInput>
                <TextInput
                    source="pick_up_address"
                    label="Точка забора товара"
                    validate={createOrderFormValidators.pick_up_address}
                />

                <BooleanInput
                    label="Доставка"
                    source="is_deliverable"
                    validate={createOrderFormValidators.is_deliverable}
                />
                <ReferenceInput label="Точка выдачи товара" source="delivery_point_id" reference="workshop">
                    <SelectInput
                        optionText="address"
                        optionValue="id"
                        validate={createOrderFormValidators.delivery_point_id}
                    />
                </ReferenceInput>
                <TextInput
                    source="delivery_address"
                    label="Точка выдачи товара"
                    validate={createOrderFormValidators.delivery_address}
                />

                <DateTimeInput
                    source="receiving_date"
                    label="Время приема"
                    validate={createOrderFormValidators.receiving_date}
                />
                <DateTimeInput
                    source="issue_date"
                    label="Время выдачи"
                    validate={createOrderFormValidators.issue_date}
                />

                <TextInput source="comment" validate={createOrderFormValidators.comment} />

                <ReferenceInput
                    label="Курьер принимающий"
                    source="courier_receiver_id"
                    reference="user"
                    filter={courierFilter}
                >
                    <SelectInput
                        optionText="full_name"
                        optionValue="id"
                        validate={createOrderFormValidators.courier_receiver_id}
                    />
                </ReferenceInput>

                <ReferenceInput
                    label="Курьер выдающий"
                    source="courier_issuer_id"
                    reference="user"
                    filter={courierFilter}
                >
                    <SelectInput
                        optionText="full_name"
                        optionValue="id"
                        validate={createOrderFormValidators.courier_issuer_id}
                    />
                </ReferenceInput>

                {/* Цена */}

                <BooleanInput label="Оплачено" source="isPaid" validate={createOrderFormValidators.isPaid} />
                <ReferenceInput label="Мастер" source="master_id" reference="user" filter={masterFilter}>
                    <SelectInput
                        optionText="full_name"
                        optionValue="id"
                        validate={createOrderFormValidators.master_id}
                    />
                </ReferenceInput>
                <ReferenceInput label="Получатель" source="receiver_id" reference="client">
                    <SelectInput
                        optionText="full_name"
                        optionValue="id"
                        validate={createOrderFormValidators.receiver_id}
                    />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    );
}