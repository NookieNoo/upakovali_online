import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function SimpleDialogWindow(props) {
    const { renderContent, title, onClose, isOpen, maxWidth } = props;

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={maxWidth}
        >
            <DialogTitle id="alert-dialog-title">{title ? title : ''}</DialogTitle>
            <DialogContent>{renderContent()}</DialogContent>
        </Dialog>
    );
}

SimpleDialogWindow.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    maxWidth: PropTypes.string,
};

export default SimpleDialogWindow;
