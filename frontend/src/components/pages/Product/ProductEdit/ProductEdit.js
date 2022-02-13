import * as React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
import { editProductFormValidators } from '@app-helpers';

export default function ProductEdit(props) {
    return (
        <Edit {...props} title=" " mutationMode="pessimistic">
            <SimpleForm redirect="show">
                <TextInput label="ServiceType" source="name" validate={editProductFormValidators.name} />
            </SimpleForm>
        </Edit>
    );
}
