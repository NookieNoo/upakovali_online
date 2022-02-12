import * as React from 'react';
import { Create, SimpleForm, TextInput, DateInput, SelectInput } from 'react-admin';
import { AutocompleteWithRef } from '@app-universal';
import { createPriceFormValidators } from '@app-helpers';

export default function PriceCreate(props) {
    return (
        <Create {...props} title="Создание прайса">
            <SimpleForm>
                <TextInput label="Название" source="name" validate={createPriceFormValidators.name} />
                <DateInput label="Действует с" source="start" validate={createPriceFormValidators.start} />
                <DateInput label="Действует до" source="end" validate={createPriceFormValidators.end} />
                <AutocompleteWithRef
                    label="Партнер"
                    source="parthner_id"
                    reference="parthner"
                    validate={createPriceFormValidators.parthner_id}
                />
            </SimpleForm>
        </Create>
    );
}
