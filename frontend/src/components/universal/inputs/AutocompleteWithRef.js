import * as React from 'react';
import PropTypes from 'prop-types';
import { ReferenceInput, AutocompleteInput } from 'react-admin';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

const styles = {
    div: {
        width: '100%',
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'space-between',
    },
    email: {
        fontSize: '0.8rem',
    },
    phone: {
        fontSize: '0.8rem',
    },
    hightlight: {
        fontWeight: 800,
    },
    withoutHightlight: {
        fontWeight: 400,
    },
};

const OptionRenderer = ({ record, filterValue, ...rest }) => {
    const nameMatches = match(record.full_name, filterValue);
    const nameParts = parse(record.full_name, nameMatches);

    const emailMatches = match(record.email, filterValue);
    const emailParts = parse(record.email, emailMatches);

    const phoneMatches = match(record.phone, filterValue);
    const phoneParts = parse(record.phone, phoneMatches);
    return (
        <div key={record.id} style={styles.div}>
            {nameParts.map((part, index) => (
                <span key={index} style={part.highlight ? styles.hightlight : styles.withoutHightlight}>
                    {part.text}
                </span>
            ))}
            <div style={styles.flex}>
                <div style={styles.email}>
                    {emailParts.map((part, index) => (
                        <span key={index} style={part.highlight ? styles.hightlight : styles.withoutHightlight}>
                            {part.text}
                        </span>
                    ))}
                </div>
                <div style={styles.phone}>
                    {phoneParts.map((part, index) => (
                        <span key={index} style={part.highlight ? styles.hightlight : styles.withoutHightlight}>
                            {part.text}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const AutocompleteWithRef = ({
    label,
    source,
    reference,
    validate,
    inputText,
    matchSuggestion,
    optionValue,
    suggestionLimit,
    resettable,
    emptyValue,
    filter,
    ...rest
}) => {
    console.log(validate);
    return (
        <ReferenceInput label={label} source={source} reference={reference} filter={filter}>
            <AutocompleteInput
                optionText={<OptionRenderer />}
                inputText={inputText}
                matchSuggestion={matchSuggestion}
                optionValue={optionValue}
                validate={validate}
                suggestionLimit={suggestionLimit}
                resettable={resettable}
                emptyValue={emptyValue}
            />
        </ReferenceInput>
    );
};

AutocompleteWithRef.defaultProps = {
    inputText: (record) => record.full_name,
    // matchSuggestion: (filter, choice) => choice.full_name.includes(filter),
    matchSuggestion: (filter, choice) => true,
    optionValue: 'id',
    suggestionLimit: 10,
    resettable: true,
    emptyValue: null,
};

AutocompleteWithRef.propTypes = {
    label: PropTypes.string,
    optionValue: PropTypes.string,
    source: PropTypes.string.isRequired,
    reference: PropTypes.string.isRequired,
    validate: PropTypes.array,
    suggestionLimit: PropTypes.number,
    resettable: PropTypes.bool,
    filter: PropTypes.object,
};

export { AutocompleteWithRef };
