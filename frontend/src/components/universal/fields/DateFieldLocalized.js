import * as React from 'react';
import { DateField, Labeled } from 'react-admin';

export default function DateFieldLocalized(props) {
    const { label, showLabel, ...rest } = props;
    return (
        <>
            {showLabel ? (
                <Labeled label={label}>
                    <DateField {...rest} />
                </Labeled>
            ) : (
                <DateField {...rest} label={label} />
            )}
        </>
    );
}

DateFieldLocalized.defaultProps = {
    locales: 'ru-RU',
    showLabel: true,
};
