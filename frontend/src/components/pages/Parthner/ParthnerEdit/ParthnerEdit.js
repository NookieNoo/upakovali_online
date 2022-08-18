import * as React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
import { editParthnerFormValidators } from '@app-helpers';
import { userRoles } from '@app-constants';
import { AutocompleteWithRef } from '@app-universal';
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

const managerFilter = { role_id: userRoles.manager.id };

export default function ParthnerEdit(props) {
    const classes = useStyles();

    return (
        <Edit {...props} mutationMode="pessimistic">
            <SimpleForm redirect="show">
                <TextInput label="Название" source="full_name" validate={editParthnerFormValidators.full_name} />
                <TextInput label="Email" source="email" validate={editParthnerFormValidators.email} />
                <PhoneInput containerClass={classes.container} inputClass={classes.inputPhone} label="Телефон" source="phone" validate={editParthnerFormValidators.phone} />
                <TextInput label="Url для уведомлений" source="notification_url" validate={editParthnerFormValidators.notification_url} />
                <TextInput label="Комментарий" source="comment" validate={editParthnerFormValidators.comment} />
                <TextInput label="Менеджер" source="manager" validate={editParthnerFormValidators.manager} />
            </SimpleForm>
        </Edit>
    );
}
