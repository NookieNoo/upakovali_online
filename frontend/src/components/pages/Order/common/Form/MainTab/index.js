import * as React from 'react';
import {
    TextInput,
    ReferenceInput,
    SelectInput,
    FormTab,
    ArrayInput,
    SimpleFormIterator,
    NumberInput,
} from 'react-admin';
import { editOrderFormValidators } from '@app-helpers';
import { userRoles, serviceTypes } from '@app-constants';
import { KladrAutocompleteBlock, AutocompleteWithRef } from '@app-universal';
import { useFormState } from 'react-final-form';
import { useGetRole } from '@app-hooks';

//TODO Добавить фильтр по партнеру
const deliveryOrPickingFilter = { product_id: serviceTypes.PACKAGE.id };

export default function MainTab(props) {
    const { isAdmin } = useGetRole();
    return (
        <>
            <ReferenceInput label="Источник" source="source_id" reference="source">
                <SelectInput
                    disabled={!isAdmin}
                    optionText="name"
                    optionValue="id"
                    validate={editOrderFormValidators.source_id}
                />
            </ReferenceInput>
            <ReferenceInput label="Статус" source="order_status_id" reference="order_status">
                <SelectInput optionText="name" optionValue="id" validate={editOrderFormValidators.order_status_id} />
            </ReferenceInput>

            <AutocompleteWithRef
                label="Партнер"
                source="parthner_id"
                reference="parthner"
                disabled={!isAdmin}
                validate={editOrderFormValidators.parthner_id}
            />

            <TextInput
                source="external_number"
                label="Внешний номер"
                disabled={!isAdmin}
                validate={editOrderFormValidators.external_number}
            />

            <AutocompleteWithRef
                label="Клиент"
                source="client_id"
                reference="client"
                disabled={!isAdmin}
                validate={editOrderFormValidators.client_id}
            />

            <ReferenceInput disabled={!isAdmin} label="Мастерская" source="workshop_id" reference="workshop">
                <SelectInput optionText="address" optionValue="id" validate={editOrderFormValidators.workshop_id} />
            </ReferenceInput>
            <ArrayInput source="gifts" label="Подарки" validate={editOrderFormValidators.gifts}>
                <SimpleFormIterator>
                    <NumberInput source="weight" label="Вес (кг)" validate={editOrderFormValidators['gifts.weight']} />
                    <NumberInput
                        source="length"
                        label="Длина (см)"
                        min={1}
                        validate={editOrderFormValidators['gifts.length']}
                    />
                    <NumberInput
                        source="width"
                        label="Ширина (см)"
                        min={1}
                        validate={editOrderFormValidators['gifts.width']}
                    />
                    <NumberInput
                        source="height"
                        label="Высота (см)"
                        min={1}
                        validate={editOrderFormValidators['gifts.height']}
                    />
                    <ReferenceInput label="Кому" source="addressee_id" reference="addressee">
                        <SelectInput
                            optionText="name"
                            optionValue="id"
                            validate={editOrderFormValidators['gifts.addressee_id']}
                        />
                    </ReferenceInput>
                    <ReferenceInput
                        label="Сервис"
                        source="service_id"
                        reference="service"
                        filter={deliveryOrPickingFilter}
                    >
                        <SelectInput
                            optionText="name"
                            optionValue="id"
                            validate={editOrderFormValidators['gifts.service_id']}
                        />
                    </ReferenceInput>
                </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput
                source="additional_products"
                label="Дополнительные товары"
                validate={editOrderFormValidators.additional_products}
            >
                <SimpleFormIterator>
                    <TextInput
                        source="name"
                        label="Название"
                        validate={editOrderFormValidators['additional_products.name']}
                    />
                    <NumberInput
                        source="price"
                        min={0}
                        label="Стоимость"
                        validate={editOrderFormValidators['additional_products.price']}
                    />
                </SimpleFormIterator>
            </ArrayInput>
        </>
    );
}
