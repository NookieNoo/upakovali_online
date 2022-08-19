import * as React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { createClientFormValidators } from 'helpers/validators';
import { PhoneInput } from '@app-universal';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    overflow: {
        '& .MuiCard-root': {overflow: 'visible !important'}
    }
}));

export default function ClientCreate(props) {
    const classes = useStyles();

    return (
        <Create {...props} title="Создание клиента" className={classes.overflow}>
            <SimpleForm redirect="show">
                <TextInput label="ФИО" source="full_name" validate={createClientFormValidators.full_name} />
                <TextInput label="Email" source="email" validate={createClientFormValidators.email} />
                <PhoneInput containlabel="Телефон" source="phone" validate={createClientFormValidators.phone} />
                <TextInput label="Комментарий" source="comment" validate={createClientFormValidators.comment} />
            </SimpleForm>
        </Create>
    );
}

