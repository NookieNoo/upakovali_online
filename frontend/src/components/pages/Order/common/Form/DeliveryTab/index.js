import * as React from 'react';
import {
    TextInput,
    ReferenceInput,
    SelectInput,
    BooleanInput,
    DateTimeInput,
    FormDataConsumer,
    FormTab,
} from 'react-admin';
import { editOrderFormValidators } from '@app-helpers';
import { userRoles, serviceTypes } from '@app-constants';
import { KladrAutocompleteBlock, AutocompleteWithRef } from '@app-universal';
import { useFormState } from 'react-final-form';
import { useGetRole } from '@app-hooks';

const courierFilter = { role_id: userRoles.courier.id };
const masterFilter = { role_id: userRoles.master.id };

export default function DeliveryTab(props) {
    const { isAdmin } = useGetRole();
    return (
        <>
            {/* Размер из прайса */}

            <BooleanInput label="Забор" source="is_pickupable" disabled={!isAdmin} />
            {/* @FIXME На каждое переключение идут запросы */}
            <FormDataConsumer>
                {({ formData, ...rest }) =>
                    formData.is_pickupable ? (
                        <KladrAutocompleteBlock
                            source="pick_up_address"
                            label="Адрес забора товара"
                            disabled={!isAdmin}
                            validate={editOrderFormValidators.pick_up_address}
                        />
                    ) : (
                        <ReferenceInput
                            label="Точка забора товара"
                            source="pick_up_point_id"
                            reference="workshop"
                            disabled={!isAdmin}
                        >
                            <SelectInput
                                optionText="address"
                                optionValue="id"
                                validate={editOrderFormValidators.is_pickupable}
                            />
                        </ReferenceInput>
                    )
                }
            </FormDataConsumer>

            <BooleanInput
                label="Доставка"
                source="is_deliverable"
                disabled={!isAdmin}
                validate={editOrderFormValidators.is_deliverable}
            />

            <FormDataConsumer>
                {({ formData, ...rest }) =>
                    formData.is_deliverable ? (
                        <KladrAutocompleteBlock
                            source="delivery_address"
                            label="Адрес выдачи товара"
                            disabled={!isAdmin}
                            validate={editOrderFormValidators.delivery_address}
                        />
                    ) : (
                        <ReferenceInput
                            label="Точка выдачи товара"
                            source="delivery_point_id"
                            disabled={!isAdmin}
                            reference="workshop"
                        >
                            <SelectInput
                                optionText="address"
                                optionValue="id"
                                validate={editOrderFormValidators.delivery_point_id}
                            />
                        </ReferenceInput>
                    )
                }
            </FormDataConsumer>

            <DateTimeInput
                source="receiving_date"
                label="Время приема"
                disabled={!isAdmin}
                validate={editOrderFormValidators.receiving_date}
            />
            <DateTimeInput
                source="issue_date"
                label="Время выдачи"
                disabled={!isAdmin}
                validate={editOrderFormValidators.issue_date}
            />

            <TextInput
                label="Комментарий"
                source="comment"
                disabled={!isAdmin}
                validate={editOrderFormValidators.comment}
            />

            <AutocompleteWithRef
                label="Курьер принимающий"
                source="courier_receiver_id"
                reference="user"
                disabled={!isAdmin}
                filter={courierFilter}
                validate={editOrderFormValidators.courier_receiver_id}
            />

            <AutocompleteWithRef
                label="Курьер выдающий"
                source="courier_issuer_id"
                reference="user"
                disabled={!isAdmin}
                filter={courierFilter}
                validate={editOrderFormValidators.courier_issuer_id}
            />

            {/* Цена */}

            <BooleanInput
                label="Оплачено"
                source="isPaid"
                disabled={!isAdmin}
                validate={editOrderFormValidators.isPaid}
            />

            <AutocompleteWithRef
                label="Мастер"
                source="master_id"
                reference="user"
                disabled={!isAdmin}
                filter={masterFilter}
                validate={editOrderFormValidators.master_id}
            />

            <AutocompleteWithRef
                label="Получатель"
                source="receiver_id"
                reference="client"
                disabled={!isAdmin}
                validate={editOrderFormValidators.receiver_id}
            />
        </>
    );
}
