import * as React from 'react';
import { Create, SimpleForm, TextInput, PasswordInput, SelectInput } from 'react-admin';
import { createUserFormValidators } from 'helpers/validators/userFormValidators';
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
    }
}));


export default function UserCreate(props) {
    const classes = useStyles();

    return (
        <Create {...props} title="Создание пользователя">
            <SimpleForm validate={createUserFormValidators.submit} redirect="show">
                <TextInput label="ФИО" source="full_name" validate={createUserFormValidators.full_name} />
                <TextInput label="Email" source="email" validate={createUserFormValidators.email} />
                <PhoneInput containerClass={classes.container} inputClass={classes.inputPhone}label="Телефон" source="phone" validate={createUserFormValidators.phone} />
                <PasswordInput label="Пароль" source="password" validate={createUserFormValidators.password} />
                <PasswordInput
                    label="Подтвердите пароль"
                    source="password_confirmation"
                    validate={createUserFormValidators.password}
                />
                <SelectInput
                    label="Роль"
                    source="role_id"
                    choices={Object.values(userRoles)}
                    optionText='visible_name'
                    validate={createUserFormValidators.role_id}
                />
            </SimpleForm>
        </Create>
    );
}
