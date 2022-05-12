import * as React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    DateInput,
    ArrayInput,
    SimpleFormIterator,
    NumberInput,
    RadioButtonGroupInput,
} from 'react-admin';
import { editPriceFormValidators } from '@app-helpers';
import { AutocompleteWithRef } from '@app-universal';
import { serviceTypes } from '@app-constants';

export default function PriceEdit(props) {
    return (
        <Edit {...props} mutationMode="pessimistic">
            <SimpleForm validate={editPriceFormValidators.submit} redirect="show">
                <TextInput label="Название" source="name" validate={editPriceFormValidators.name} />
                <DateInput
                    label="Действует с"
                    source="start"
                    validate={editPriceFormValidators.start}
                    inputProps={{ autoComplete: 'new-password' }}
                />
                <DateInput
                    label="Действует до"
                    source="end"
                    validate={editPriceFormValidators.end}
                    inputProps={{ autoComplete: 'new-password' }}
                />
                <AutocompleteWithRef
                    label="Партнер"
                    source="parthner_id"
                    reference="parthner"
                    validate={editPriceFormValidators.parthner_id}
                />
                <ArrayInput source="services" label="Сервисы" validate={editPriceFormValidators.services}>
                    <SimpleFormIterator>
                        <TextInput source="name" label="Название" validate={editPriceFormValidators['services.name']} />
                        <NumberInput
                            source="sum"
                            label="Сумма"
                            min={0}
                            validate={editPriceFormValidators['services.sum']}
                        />
                        <RadioButtonGroupInput
                            source="product_id"
                            choices={Object.values(serviceTypes)}
                            label="ServiceType"
                            validate={editPriceFormValidators['services.product_id']}
                        />
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Edit>
    );
}
