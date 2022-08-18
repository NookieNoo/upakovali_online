import * as React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { createParthnerFormValidators } from '@app-helpers';
import { PhoneInput } from '@app-universal';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    inputPhone: {
        height: '46px',
        width: '256px !important',
        backgroundColor: 'rgba(0, 0, 0, 0.04) !important',
        border: '1px solid white !important',
        borderBottom: '1px solid grey !important',
        borderTopLeftRadius: '4px !important',
        borderTopRightRadius: '4px !important',
        borderBottomLeftRadius: '0 !important',
        borderBottomRightRadius: '0 !important',
        transition: 'background-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms !important',

        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.13) !important',
        },

        '&:focus': {
            boxShadow: 'none !important'
        }

    },
    container: {

        '& div': {
            backgroundColor: 'transparent !important',
        },

        marginBottom: '19px'
    }
}));

export default function ParthnerCreate(props) {
    const classes = useStyles();

    return (
        <Create {...props} title="Создание партнера">
            <SimpleForm redirect="show">
                <TextInput label="Название" source="full_name" validate={createParthnerFormValidators.full_name} />
                <TextInput label="Email" source="email" validate={createParthnerFormValidators.email} />
                <PhoneInput containerClass={classes.container} inputClass={classes.inputPhone} label="Телефон" source="phone" validate={createParthnerFormValidators.phone} />
                <TextInput label="Url для уведомлений" source="notification_url" validate={createParthnerFormValidators.notification_url} />
                <TextInput label="Комментарий" source="comment" validate={createParthnerFormValidators.comment} />
                <TextInput label="Менеджер" source="manager" validate={createParthnerFormValidators.manager} />
            </SimpleForm>
        </Create>
    );
}
