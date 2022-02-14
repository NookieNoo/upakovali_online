import * as React from 'react';
import { Create, SimpleForm, TextInput, Toolbar, translate, SaveButton } from 'react-admin';
import Button from '@material-ui/core/Button';
import { createSourceFormValidators } from '@app-helpers';

const SourceCreateToolbar = translate(({ onCancel, translate, ...props }) => (
    <Toolbar {...props}>
        <SaveButton />
        <Button onClick={onCancel}>{translate('ra.action.cancel')}</Button>
    </Toolbar>
));

export default function SourceCreate(props) {
    return (
        <Create {...props} title=" ">
            <SimpleForm toolbar={<SourceCreateToolbar onCancel={props.onCancel} />}>
                <TextInput label="Название" source="name" validate={createSourceFormValidators.name} />
            </SimpleForm>
        </Create>
    );
}
