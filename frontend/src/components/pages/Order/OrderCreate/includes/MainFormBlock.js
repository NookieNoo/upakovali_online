import * as React from 'react';
import {
    TextInput,
    ReferenceInput,
    SelectInput,
    ArrayInput,
    SimpleFormIterator,
} from 'react-admin';
import { serviceTypes } from '@app-constants';
import { createOrderFormValidators } from '@app-helpers';
import { AutocompleteWithRef } from '@app-universal';
import { SelectInputWrap } from '@app-components/overriding';

//TODO Добавить фильтр по партнеру
const deliveryOrPickingFilter = { product_id: serviceTypes.PACKAGE.id };

export default function MainFormBlock(props) {
    return (
        <>
            <ReferenceInput label="Источник" source="source_id" reference="source">
                <SelectInputWrap
                    optionText="name"
                    optionValue="id"
                    validate={createOrderFormValidators.source_id}
                    getDefaultValue={(choices) => choices[0].id}
                />
            </ReferenceInput>
            <AutocompleteWithRef
                label="Партнер"
                source="parthner_id"
                reference="parthner"
                validate={createOrderFormValidators.parthner_id}
            />
            <TextInput
                source="external_number"
                label="Внешний номер"
                validate={createOrderFormValidators.external_number}
            />
            <AutocompleteWithRef
                label="Клиент"
                source="client_id"
                reference="client"
                validate={createOrderFormValidators.client_id}
            />
            <ReferenceInput label="Мастерская" source="workshop_id" reference="workshop">
                <SelectInput optionText="address" optionValue="id" validate={createOrderFormValidators.workshop_id} />
            </ReferenceInput>
            <ArrayInput source="gifts" label="Подарки" validate={createOrderFormValidators.gifts}>
                <SimpleFormIterator>
                    <TextInput source="weight" label="Вес (кг)" validate={createOrderFormValidators['gifts.weight']} />
                    <ReferenceInput label="Кому" source="addressee_id" reference="addressee">
                        <SelectInput
                            optionText="name"
                            optionValue="id"
                            validate={createOrderFormValidators['gifts.addressee_id']}
                        />
                    </ReferenceInput>
                    <ReferenceInput
                        label="Размер подарка (см)"
                        source="service_id"
                        reference="service"
                        filter={deliveryOrPickingFilter}
                    >
                        <SelectInput
                            optionText="name"
                            optionValue="id"
                            validate={createOrderFormValidators['gifts.service_id']}
                        />
                    </ReferenceInput>
                </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput
                source="additional_products"
                label="Дополнительные товары"
                validate={createOrderFormValidators.additional_products}
            >
                <SimpleFormIterator>
                    <TextInput
                        source="name"
                        label="Название"
                        validate={createOrderFormValidators['additional_products.name']}
                    />
                    <TextInput
                        source="price"
                        label="Стоимость"
                        validate={createOrderFormValidators['additional_products.price']}
                    />
                </SimpleFormIterator>
            </ArrayInput>
        </>
    );
}
