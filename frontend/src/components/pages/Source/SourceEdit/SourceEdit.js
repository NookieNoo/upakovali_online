import * as React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
import { editSourceFormValidators } from '@app-helpers';

export default function SourceEdit(props) {
    return (
        <Edit {...props} title=" " mutationMode="pessimistic">
            <SimpleForm redirect="show">
                <TextInput label="Название" source="name" validate={editSourceFormValidators.name} />
            </SimpleForm>
        </Edit>
    );
}
