import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function KladrAutocomplete({
    value,
    handleChange,
    options,
    handleInput,
    filterOptionsCallback,
    loading,
    getOptionSelected,
    getOptionLabel,
    label,
    error,
    helperText,
    id,
}) {
    const [open, setOpen] = React.useState(false);
    const filterOptions = filterOptionsCallback ? filterOptionsCallback : (x) => x;

    return (
        <Autocomplete
            id={id}
            // style={{ width: 300 }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={getOptionSelected}
            getOptionLabel={getOptionLabel}
            options={options}
            filterOptions={filterOptions}
            loading={loading}
            onChange={handleChange}
            value={value}
            freeSolo
            renderInput={(params) => (
                <TextField
                    {...params}
                    error={error}
                    helperText={helperText}
                    label={label}
                    variant="filled"
                    onChange={handleInput}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}

KladrAutocomplete.defaultProps = {
    getOptionSelected: (option, value) => option === value,
    getOptionLabel: (option) => option.label,
    label: 'Asynchronous',
    id: 'kladr-autocomplete',
};

KladrAutocomplete.propTypes = {
    handleChange: PropTypes.func,
};
