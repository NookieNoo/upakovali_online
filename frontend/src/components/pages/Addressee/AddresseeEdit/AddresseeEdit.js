import * as React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
import { editAddresseeFormValidators } from '@app-helpers';

export default function AddresseeEdit(props) {
    return (
        <Edit {...props} title=" " mutationMode="pessimistic">
            <SimpleForm redirect="show">
                <TextInput label="Кому" source="name" validate={editAddresseeFormValidators.name} />
            </SimpleForm>
        </Edit>
    );
}
