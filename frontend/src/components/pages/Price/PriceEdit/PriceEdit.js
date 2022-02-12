import * as React from 'react';
import { Edit, SimpleForm, TextInput, DateInput, SelectInput } from 'react-admin';
import { editPriceFormValidators } from '@app-helpers';
import { AutocompleteWithRef } from '@app-universal';

export default function PriceEdit(props) {
    return (
        <Edit {...props} mutationMode="pessimistic">
            <SimpleForm redirect="show">
                <TextInput label="Название" source="name" validate={editPriceFormValidators.name} />
                <DateInput label="Действует с" source="start" validate={editPriceFormValidators.start} />
                <DateInput label="Действует до" source="end" validate={editPriceFormValidators.end} />
                <AutocompleteWithRef
                    label="Партнер"
                    source="parthner_id"
                    reference="parthner"
                    validate={editPriceFormValidators.parthner_id}
                />
            </SimpleForm>
        </Edit>
    );
}
