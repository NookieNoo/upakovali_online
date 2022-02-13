import * as React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
import { editWorkshopFormValidators } from '@app-helpers';

export default function WorkshopEdit(props) {
    return (
        <Edit {...props} title=" " mutationMode="pessimistic">
            <SimpleForm redirect="show">
                <TextInput label="Название" source="address" validate={editWorkshopFormValidators.address} />
            </SimpleForm>
        </Edit>
    );
}
