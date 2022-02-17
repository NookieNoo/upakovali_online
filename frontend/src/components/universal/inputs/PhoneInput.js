import * as React from 'react';
import { TextInput } from 'react-admin';
import PhoneMaskedInput from './PhoneMaskedInput';

export function PhoneInput(props) {
    return (
        <TextInput
            options={{
                InputProps: {
                    inputComponent: PhoneMaskedInput,
                },
            }}
            {...props}
        />
    );
}
