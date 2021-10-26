
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function KladrAutocomplete({value, handleChange, options, handleInput, filterOptionsCallback, loading}) {
    const [open, setOpen] = React.useState(false);
    const filterOptions = filterOptionsCallback ? filterOptionsCallback : (x) => x;

    return (
        <Autocomplete
            id="kladr-autocomplete"
            style={{ width: 300 }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) => {
                // console.log(option, value);
                return option.id === value.id;
            }}
            getOptionLabel={(option) => {
                // console.log(option);
                return option.fullName}
            }
            options={options}
            filterOptions={filterOptions}
            loading={loading}
            onChange={handleChange}
            value={value}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Asynchronous"
                    variant="outlined"
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
