import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { TextInput, useTranslate } from 'react-admin';
import IconButton from '@material-ui/core/IconButton';
import { DialogElement } from 'components/universal/modal';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import { QrIcon } from 'components/universal/icons';
import { replacer } from './functions';

const ModalContent = ({ onOpen, onClose, onSubmit, submitKeyLabel, ...rest }) => {
    const [number, setState] = useState('');
    const translate = useTranslate();
    const handleChange = (event) => {
        setState(replacer(event.target.value));
    };
    const submitCallback = () => {
        onSubmit(number);
        onClose();
    };
    return (
        <div>
            <DialogTitle id="form-dialog-title">Здесь Вы можете просканировать ваш штрих-код.</DialogTitle>
            <DialogContent>
                {/* <DialogContentText>
                Здесь Вы можете просканировать ваш штрих-код.
            </DialogContentText> */}
                <TextField
                    onChange={handleChange}
                    value={number}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Внешний номер"
                    type="text"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    {translate('ra.action.cancel')}
                </Button>
                <Button onClick={submitCallback} color="primary">
                    {submitKeyLabel}
                </Button>
            </DialogActions>
        </div>
    );
};

export default function TextInputWithScanner({
    onSubmit,
    validate,
    source,
    label,
    scannerInputProps,
    scannerModalProps,
}) {
    return (
        <Box display={'flex'} alignSelf={'center'}>
            <TextInput
                source={source}
                label={label}
                validate={validate}
                {...scannerInputProps}
                InputProps={{
                    endAdornment: (
                        <DialogElement
                            maxWidth="md"
                            dialogOpenComponent={
                                <IconButton>
                                    <QrIcon />
                                </IconButton>
                            }
                            content={(props) => <ModalContent onSubmit={onSubmit} {...scannerModalProps} {...props} />}
                        />
                    ),
                }}
            />
        </Box>
    );
}

TextInputWithScanner.defaultProps = {
    disabled: false,
};

TextInputWithScanner.propTypes = {
    handleChange: PropTypes.func,
    disabled: PropTypes.bool,
};
