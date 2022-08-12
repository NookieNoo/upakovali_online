import * as React from 'react';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { List, MenuItem, Collapse, Tooltip, Typography } from '@material-ui/core';
import { useTranslate } from 'react-admin';

const MenuAccordion = (props) => {

    const { handleToggle, isOpen, name, icon, children, dense, classes } = props;
    const translate = useTranslate();

    const sidebarIsOpen = false;
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
        <div>
            {sidebarIsOpen || isOpen ? (
                header
            ) : (
                <Tooltip title={translate(name)} placement="right">
                    {header}
                </Tooltip>
            )}
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List
                    component="div"
                    dense={dense}
                    disablePadding
                    sx={{
                        '& a': {
                            transition:
                                'padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
                            paddingLeft: sidebarIsOpen ? 4 : 2,
                        },
                    }}
                >
                    {children}
                </List>
            </Collapse>
        </div>
    );
};

export { MenuAccordion };