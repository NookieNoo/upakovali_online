import * as React from 'react';
import PropTypes from 'prop-types';
import { SelectInput } from 'react-admin';

const SelectInputWrap = ({ optionText, getDefaultValue, ...rest }) => {
    const { choices } = rest;

    let props = {};

    if (getDefaultValue && choices && choices.length) {
        props.defaultValue = getDefaultValue(choices);
    }

    return <SelectInput optionText={optionText} {...props} {...rest} />;
};

SelectInputWrap.propTypes = {
    getDefaultValue: PropTypes.func,
};

export { SelectInputWrap };
