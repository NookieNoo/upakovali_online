import * as React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { createClientFormValidators } from 'helpers/validators';
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
    },
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
                <PhoneInput containerClass={classes.container} inputClass={classes.inputPhone} containlabel="Телефон" source="phone" validate={createClientFormValidators.phone} />
                <TextInput label="Комментарий" source="comment" validate={createClientFormValidators.comment} />
            </SimpleForm>
        </Create>
    );
}

