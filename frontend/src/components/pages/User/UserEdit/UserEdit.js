import * as React from 'react';
import { Edit, SimpleForm, TextInput, PasswordInput, SelectInput, EmailField, BooleanInput } from 'react-admin';
import { editUserFormValidators } from 'helpers/validators/userFormValidators';
import { userRoles } from '@app-constants';
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

export default function UserEdit(props) {
    const onSuccess = () => {
        console.log('success');
    };
    const onFailure = () => {
        console.log('onFailure');
    };

    const transform = (data) => ({
        ...data,
        role_id: data.role.id,
    });
    const classes = useStyles();

    return (
        <Edit {...props} transform={transform} mutationMode="pessimistic" className={classes.overflow}>
            <SimpleForm validate={editUserFormValidators.submit} redirect="show">
                <TextInput label="ФИО" source="full_name" validate={editUserFormValidators.full_name} />
                <EmailField label="Email" source="email" />
                <PhoneInput containerClass={classes.container} inputClass={classes.inputPhone}label="Телефон" source="phone" validate={editUserFormValidators.phone} />
                <PasswordInput label="Пароль" source="password" />
                <PasswordInput label="Подтверждение пароля" source="password_confirmation" />
                <SelectInput
                    label="Роль"
                    source="role.id"
                    choices={Object.values(userRoles)}
                    optionText="visible_name"
                    validate={editUserFormValidators.role_id}
                />
            </SimpleForm>
        </Edit>
    );
}
