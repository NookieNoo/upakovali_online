import * as React from 'react';
import { Create, SimpleForm, TextInput, Toolbar, translate, SaveButton } from 'react-admin';
import Button from '@material-ui/core/Button';
import { createProductFormValidators } from '@app-helpers';

const ProductCreateToolbar = translate(({ onCancel, translate, ...props }) => (
    <Toolbar {...props}>
        <SaveButton />
        <Button onClick={onCancel}>{translate('ra.action.cancel')}</Button>
    </Toolbar>
));

export default function ProductCreate(props) {
    return (
        <Create {...props} title=" ">
            <SimpleForm toolbar={<ProductCreateToolbar onCancel={props.onCancel} />}>
                <TextInput label="ServiceType" source="name" validate={createProductFormValidators.name} />
            </SimpleForm>
        </Create>
    );
}
