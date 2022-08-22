import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SimpleDialogWindow from './SimpleDialogWindow';

function DialogElement(props) {
    const { dialogOpenComponent, maxWidth, beforeCloseCallback, beforeOpenCallback, disabled} = props;
    const [isOpen, setIsOpen] = useState(props.isOpen);

    const handleOpen = React.useCallback(() => {
        beforeOpenCallback();
        setIsOpen(true);
    }, [beforeOpenCallback]);

    const handleClose = React.useCallback(() => {
        beforeCloseCallback();
        setIsOpen(false);
    }, [beforeCloseCallback]);

    return (
        <>
            <div onClick={disabled ? () => {} : handleOpen}>{dialogOpenComponent}</div>
            <SimpleDialogWindow
                isOpen={isOpen}
                renderContent={() => props.content({ onOpen: handleOpen, onClose: handleClose })}
                onClose={handleClose}
                maxWidth={maxWidth}
            />
        </>
    );
}

DialogElement.propTypes = {
    isOpen: PropTypes.bool,
    dialogOpenComponent: PropTypes.node.isRequired,
    maxWidth: PropTypes.string,
    content: PropTypes.func,
    beforeCloseCallback: PropTypes.func,
    beforeOpenCallback: PropTypes.func,
    disabled: PropTypes.bool
};

DialogElement.defaultProps = {
    isOpen: false,
    disabled: true,
    beforeCloseCallback: () => {},
    beforeOpenCallback: () => {},
};

export default DialogElement;
