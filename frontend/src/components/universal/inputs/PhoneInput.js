import * as React from 'react';
import { TextInput } from 'react-admin';
import PhoneMaskedInput from './PhoneMaskedInput';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import ru from 'react-phone-input-2/lang/ru.json';
import { Field } from 'react-final-form';

export function PhoneInput2(props) {
    const { containerClass, inputClass, buttonClass, dropdownClass, searchClass } = props;

    return (
        <Field
            name="phone"
            render={({ input }) => {
                console.log('input', input);
                return (
                    <PhoneInput
                        containerClass={containerClass}
                        inputClass={inputClass}
                        buttonClass={buttonClass}
                        dropdownClass={dropdownClass}
                        searchClass={searchClass}
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
