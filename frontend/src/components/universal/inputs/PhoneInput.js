import * as React from 'react';
import { TextInput, useInput, TextField, FieldTitle, ValidationError } from 'react-admin';
import PhoneMaskedInput from './PhoneMaskedInput';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import ru from 'react-phone-input-2/lang/ru.json';
import { Field } from 'react-final-form';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    phoneContent: {
        height: '75px',
    },
    input: {
        height: '48px',
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
            boxShadow: 'none !important',
        },
    },
    container: {
        marginTop: '8px',
        '& div': {
            backgroundColor: 'transparent !important',
        },
    },
    errorText: {
        width: '228px',
        color: '#f44336',
        marginLeft: '14px',
        marginRight: '14px',
        marginTop: '4px',
        fontWeight: '400',
        lineHeight: '1.66',
        fontSize: '0.75rem',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    errorInput: {
        borderBottom: '1px solid #f44336 !important',
        color: 'red',
    },
    errorContainer: {
        marginBottom: '0',
        '& .special-label': {
            color: '#f44336',
        },
    }
}));

PhoneInput2.propTypes = {
    containerClass: PropTypes.object,
    inputClass: PropTypes.object,
    buttonClass: PropTypes.object,
    dropdownClass: PropTypes.object,
    searchClass: PropTypes.object,

};

export function PhoneInput2(props) {
    const { containerClass, inputClass, buttonClass, dropdownClass, searchClass } = props;
    const classes = useStyles();

    const {
        input: { name, onChange, onFocus, ...rest },
        meta: { touched, error, ...metaRest },
        isRequired,
        ...rest2
    } = useInput(props);

    return (
        <Field
            name="phone"
            render={({ input }) => {
                return (
                    <div className={classes.phoneContent}>
                        <PhoneInput
                            containerClass={!!(touched && error) ? `${classes.errorContainer} ${classes.container} ${containerClass}` : `${classes.container} ${containerClass}`}
                            inputClass={!!(touched && error) ? `${classes.errorInput} ${classes.input} ${inputClass}` : `${classes.input} ${inputClass}`}
                            buttonClass={`${classes.button} ${buttonClass}`}
                            dropdownClass={`${classes.dropdown} ${dropdownClass}`}
                            searchClass={`${classes.search} ${searchClass}`}
                            specialLabel={props?.label || 'Телефон'}
                            inputProps={{
                                name: 'phone',
                                required: true,
                                // autoFocus: true,
                                enableSearch: true,
                            }}
                            localization={ru}
                            preferredCountries={['ru', 'ua', 'kz', 'gr', 'de']}
                            name="phone"
                            {...input}
                            onChange={onChange}
                            onFocus={onFocus}
                        />
                        {!!(touched && error) && <div className={classes.errorText}><ValidationError error={touched && error} /></div>}
                    </div>
                );
            }}
            placeholder="latitude"
        />
    );
}
