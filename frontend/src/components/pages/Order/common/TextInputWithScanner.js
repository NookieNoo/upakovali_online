import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { TextInput, useTranslate } from 'react-admin';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import CropFreeIcon from '@material-ui/icons/CropFree';
import { DialogElement } from 'components/universal/modal';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import { QrIcon } from 'components/universal/icons';

const ModalContent = ({ onOpen, onClose, onSubmit, ...rest }) => {
    const [number, setState] = useState('');
    const translate = useTranslate();
    const handleChange = (event) => {
        setState(event.target.value);
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
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Внешний номер"
                    type="email"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    {translate('ra.action.cancel')}
                </Button>
                <Button onClick={submitCallback} color="primary">
                    {translate('ra.action.save')}
                </Button>
            </DialogActions>
        </div>
    );
};

export default function TextInputWithScanner({ onSubmit, validate, source, label }) {
    return (
        <Box display={'flex'} alignSelf={'center'}>
            <TextInput
                source={source}
                label={label}
                validate={validate}
                InputProps={{
                    endAdornment: (
                        <DialogElement
                            maxWidth="md"
                            dialogOpenComponent={
                                <IconButton>
                                    <QrIcon />
                                </IconButton>
                            }
                            content={(props) => <ModalContent onSubmit={onSubmit} {...props} />}
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
