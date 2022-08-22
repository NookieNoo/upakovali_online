import * as React from 'react';
import { TextInput } from 'react-admin';
import PhoneMaskedInput from './PhoneMaskedInput';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import ru from 'react-phone-input-2/lang/ru.json';
import { Field } from 'react-final-form';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    input: {
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

PhoneInput2.propTypes = {
    containerClass: PropTypes.object,
    inputClass: PropTypes.object,
    buttonClass: PropTypes.object,
    dropdownClass: PropTypes.object,
    searchClass: PropTypes.object
};

export function PhoneInput2(props) {
    const { containerClass, inputClass, buttonClass, dropdownClass, searchClass } = props;
    const classes = useStyles();

    return (
        <Field
            name="phone"
            render={({ input }) => {
                console.log('input', input);
                return (
                    <PhoneInput
                        containerClass={`${classes.container} ${containerClass}`}
                        inputClass={`${classes.input} ${inputClass}`}
                        buttonClass={`${classes.button} ${buttonClass}`}
                        dropdownClass={`${classes.dropdown} ${dropdownClass}`}
                        searchClass={`${classes.serach} ${searchClass}`}
                        inputProps={{
                            name: 'phone',
                            required: true,
                            autoFocus: true,
                            enableSearch: true,
                        }}
                        localization={ru}
                        preferredCountries={['ru', 'ua', 'kz', 'gr', 'de']}
                        name="phone"
                        {...input}
                    />
                );
            }}
            placeholder="latitude"
        />
    );
}


