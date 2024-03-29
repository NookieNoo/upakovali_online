import * as React from 'react';
import { List, MenuItem, Collapse, Typography } from '@material-ui/core';
import { useTranslate } from 'react-admin';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';

const MenuAccordion = (props) => {

    const { handleToggle, isOpen, name, icon, children, dense, classes } = props;
    const translate = useTranslate();

    const header = (
            <MenuItem dense={dense} onClick={handleToggle}>
                <div className={classes}>
                    {icon}
                </div>
                <Typography variant="inherit" color="textSecondary">
                    {translate(name)}
                </Typography>
            </MenuItem>
    );

    return (
        <Box
            sx={{
                width: 240
            }}
        >
            <div>
                {header}
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List
                        component="div"
                        dense={dense}
                        disablePadding
                    >
                        {children}
                    </List>
                </Collapse>
            </div>
        </Box>
    );
};

MenuAccordion.propTypes = {
    handleToggle: PropTypes.func,
    isOen: PropTypes.bool,
    dense: PropTypes.bool,
    name: PropTypes.string,
    icon: PropTypes.element,
    children: PropTypes.element,
    classes: PropTypes.object
}

export { MenuAccordion };
