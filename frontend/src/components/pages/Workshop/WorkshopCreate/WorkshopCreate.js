import * as React from 'react';
import { Create, SimpleForm, TextInput, Toolbar, translate, SaveButton } from 'react-admin';
import Button from '@material-ui/core/Button';
import { createWorkshopFormValidators } from '@app-helpers';

const WorkshopCreateToolbar = translate(({ onCancel, translate, ...props }) => (
    <Toolbar {...props}>
        <SaveButton />
        <Button onClick={onCancel}>{translate('ra.action.cancel')}</Button>
    </Toolbar>
));

export default function WorkshopCreate(props) {
    return (
        <Create {...props} title=" ">
            <SimpleForm toolbar={<WorkshopCreateToolbar onCancel={props.onCancel} />}>
                <TextInput label="Название" source="address" validate={createWorkshopFormValidators.address} />
            </SimpleForm>
        </Create>
    );
}
