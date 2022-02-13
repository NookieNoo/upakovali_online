import * as React from 'react';
import { Create, SimpleForm, TextInput, Toolbar, translate, SaveButton } from 'react-admin';
import Button from '@material-ui/core/Button';
import { createAddresseeFormValidators } from '@app-helpers';

const AddresseeCreateToolbar = translate(({ onCancel, translate, ...props }) => (
    <Toolbar {...props}>
        <SaveButton />
        <Button onClick={onCancel}>{translate('ra.action.cancel')}</Button>
    </Toolbar>
));

export default function AddresseeCreate(props) {
    return (
        <Create {...props} title=" ">
            <SimpleForm toolbar={<AddresseeCreateToolbar onCancel={props.onCancel} />}>
                <TextInput label="Кому" source="name" validate={createAddresseeFormValidators.name} />
            </SimpleForm>
        </Create>
    );
}
