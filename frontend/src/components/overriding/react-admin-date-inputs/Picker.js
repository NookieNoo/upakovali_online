import { useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import { useInput, FieldTitle, useTranslate, InputHelperText } from 'react-admin';
import { LocalizationProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';

const Picker = (props) => {
    const { providerOptions, label, source, resource, options, className, fullWidth, Component, validate } = props;
    const translate = useTranslate();

    const {
        input,
        meta: { touched, error },
        isRequired,
    } = useInput({ source, validate });

    const handleChange = useCallback(
        (value) => {
            input.onChange(value);

            Date.parse(value) ? input.onChange(value.toISOString()) : input.onChange(null);
        },
        [input]
    );
    console.log('source', source);
    return (
        <div className="picker">
            <LocalizationProvider {...providerOptions}>
                <Component
                    {...options}
                    label={<FieldTitle label={label} source={source} resource={resource} isRequired={isRequired} />}
                    margin="normal"
                    // error={!!(touched && error)}
                    // helperText={'touched && error'}
                    className={className}
                    value={input.value ? new Date(input.value) : null}
                    clearText={translate('ra.action.clear_input_value')}
                    cancelText={translate('ra.action.cancel')}
                    onChange={(date) => handleChange(date)}
                    onBlur={() => input.onBlur(input.value ? new Date(input.value).toISOString() : null)}
                    renderInput={(props) => (
                        <TextField
                            {...props}
                            error={!!(touched && error)}
                            // helperText={touched && error}
                            helperText={
                                !!(touched && error) && (
                                    <InputHelperText touched={touched} error={error} helperText={error} />
                                )
                            }
                            margin="normal"
                            variant="filled"
                            fullWidth={fullWidth}
                        />
                    )}
                    ampm={false}
                />
            </LocalizationProvider>
        </div>
    );
};

Picker.defaultProps = {
    input: {},
    isRequired: false,
    meta: { touched: false, error: false },
    options: {},
    resource: '',
    source: '',
    labelTime: '',
    className: '',
    providerOptions: {
        dateAdapter: DayjsUtils,
        locale: undefined,
    },
    fullWidth: false,
    onChange: () => {},
};

export default Picker;
