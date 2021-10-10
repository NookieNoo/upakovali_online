import * as React from 'react';
import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, BooleanInput, DateTimeInput } from 'react-admin';
import { editOrderFormValidators } from '@app-helpers';
import { userRoles } from '@app-constants';

const courierFilter = { role_id: userRoles.courier.id };
const masterFilter = { role_id: userRoles.master.id };

export default function OrderEdit(props) {
    return (
        <Edit {...props} mutationMode="pessimistic">
            <SimpleForm>
                <ReferenceInput label="Источник" source="source_id" reference="source">
                    <SelectInput optionText="name" optionValue="id" validate={editOrderFormValidators.source_id} />
                </ReferenceInput>
                <ReferenceInput label="Партнер" source="parthner_id" reference="parthner">
                    <SelectInput
                        optionText="full_name"
                        optionValue="id"
                        validate={editOrderFormValidators.parthner_id}
                    />
                </ReferenceInput>
                <TextInput
                    source="external_number"
                    label="Внешний номер"
                    validate={editOrderFormValidators.external_number}
                />
                <ReferenceInput label="Клиент" source="client_id" reference="client">
                    <SelectInput optionText="full_name" optionValue="id" validate={editOrderFormValidators.client_id} />
                </ReferenceInput>
                <ReferenceInput label="Мастерская" source="workshop_id" reference="workshop">
                    <SelectInput optionText="address" optionValue="id" validate={editOrderFormValidators.workshop_id} />
                </ReferenceInput>

                {/* Размер из прайса */}

                <ReferenceInput label="Кому" source="addressee_id" reference="addressee">
                    <SelectInput optionText="name" optionValue="id" validate={editOrderFormValidators.addressee_id} />
                </ReferenceInput>

                <BooleanInput label="Забор" source="is_pickupable" />
                <ReferenceInput label="Точка забора товара" source="pick_up_point_id" reference="workshop">
                    <SelectInput
                        optionText="address"
                        optionValue="id"
                        validate={editOrderFormValidators.is_pickupable}
                    />
                </ReferenceInput>
                <TextInput
                    source="pick_up_address"
                    label="Точка забора товара"
                    validate={editOrderFormValidators.pick_up_address}
                />

                <BooleanInput
                    label="Доставка"
                    source="is_deliverable"
                    validate={editOrderFormValidators.is_deliverable}
                />
                <ReferenceInput label="Точка выдачи товара" source="delivery_point_id" reference="workshop">
                    <SelectInput
                        optionText="address"
                        optionValue="id"
                        validate={editOrderFormValidators.delivery_point_id}
                    />
                </ReferenceInput>
                <TextInput
                    source="delivery_address"
                    label="Точка выдачи товара"
                    validate={editOrderFormValidators.delivery_address}
                />

                <DateTimeInput
                    source="receiving_date"
                    label="Время приема"
                    validate={editOrderFormValidators.receiving_date}
                />
                <DateTimeInput source="issue_date" label="Время выдачи" validate={editOrderFormValidators.issue_date} />

                <TextInput source="comment" validate={editOrderFormValidators.comment} />

                <ReferenceInput
                    label="Курьер принимающий"
                    source="courier_receiver_id"
                    reference="user"
                    filter={courierFilter}
                >
                    <SelectInput
                        optionText="full_name"
                        optionValue="id"
                        validate={editOrderFormValidators.courier_receiver_id}
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
                        validate={editOrderFormValidators.courier_issuer_id}
                    />
                </ReferenceInput>

                {/* Цена */}

                <BooleanInput label="Оплачено" source="isPaid" validate={editOrderFormValidators.isPaid} />
                <ReferenceInput label="Мастер" source="master_id" reference="user" filter={masterFilter}>
                    <SelectInput optionText="full_name" optionValue="id" validate={editOrderFormValidators.master_id} />
                </ReferenceInput>
                <ReferenceInput label="Получатель" source="receiver_id" reference="client">
                    <SelectInput
                        optionText="full_name"
                        optionValue="id"
                        validate={editOrderFormValidators.receiver_id}
                    />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    );
}
