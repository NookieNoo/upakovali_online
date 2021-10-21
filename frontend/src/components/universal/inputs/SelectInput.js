import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { get as loGet } from 'lodash';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SelectInput({ options, value, onChange, inputLabel, optionValueField, optionLabelField }) {
    const classes = useStyles();

    return (
        <div>
            <FormControl className={classes.formControl}>
                {inputLabel && <InputLabel id="demo-simple-select-label">{inputLabel}</InputLabel>}
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={value} onChange={onChange}>
                    {options.map((it) => (
                        <MenuItem
                            key={loGet(it, optionValueField)}
                            value={loGet(it, optionValueField)}
                            disabled={it.disabled}
                        >
                            {loGet(it, optionLabelField)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

SelectInput.defaultProps = {
    optionValueField: 'value',
    optionLabelField: 'label',
};
