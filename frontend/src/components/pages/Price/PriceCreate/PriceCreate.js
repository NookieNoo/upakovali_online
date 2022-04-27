import * as React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    DateInput,
    ArrayInput,
    SimpleFormIterator,
    NumberInput,
    RadioButtonGroupInput,
} from 'react-admin';
import { AutocompleteWithRef } from '@app-universal';
import { createPriceFormValidators } from '@app-helpers';
import { serviceTypes } from '@app-constants';

export default function PriceCreate(props) {
    return (
        <Create {...props} title="Создание прайса">
            <SimpleForm validate={createPriceFormValidators.submit} redirect="show">
                <TextInput label="Название" source="name" validate={createPriceFormValidators.name} />
                <DateInput label="Действует с" source="start" inputProps={{ autocomplete: 'new-password' }} validate={createPriceFormValidators.start} />
                <DateInput label="Действует до" source="end" inputProps={{ autocomplete: 'new-password' }} validate={createPriceFormValidators.end} />
                <AutocompleteWithRef
                    label="Партнер"
                    source="parthner_id"
                    reference="parthner"
                    validate={createPriceFormValidators.parthner_id}
                />
                <ArrayInput source="services" label="Сервисы" validate={createPriceFormValidators.services}>
                    <SimpleFormIterator>
                        <TextInput
                            source="name"
                            label="Название"
                            validate={createPriceFormValidators['services.name']}
                        />
                        <NumberInput
                            source="sum"
                            label="Сумма"
                            min={0}
                            validate={createPriceFormValidators['services.sum']}
                        />
                        <RadioButtonGroupInput
                            source="product_id"
                            choices={Object.values(serviceTypes)}
                            label="ServiceType"
                            validate={createPriceFormValidators['services.product_id']}
                        />
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create>
    );
}
