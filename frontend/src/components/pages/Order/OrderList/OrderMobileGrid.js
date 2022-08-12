import * as React from 'react';
import { isValidElement, ReactNode, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { linkToRecord, sanitizeListRestProps, useListContext, RecordContextProvider } from 'ra-core';
import { SimpleAccordionMemo } from '@app-universal';

const useStyles = makeStyles(
    {
        tertiary: { float: 'right', opacity: 0.541176 },
    },
    { name: 'RaSimpleList' }
);

const OrderMobileGrid = (props) => {
    const {
        className,
        classes: classesOverride,
        hasBulkActions,
        leftAvatar,
        leftIcon,
        linkType = 'edit',
        primaryText,
        rightAvatar,
        rightIcon,
        secondaryText,
        tertiaryText,
        rowStyle,
        ...rest
    } = props;
    const { basePath, data, ids, loaded, total } = useListContext(props);
    const classes = useStyles(props);

    if (loaded === false) {
        // FIXME
        return <div>LOADING</div>;
    }

    return (
        total > 0 && (
            <List className={className} {...sanitizeListRestProps(rest)}>
                {ids.map((id, rowIndex) => {
                    const item = data[id];
                    return (
                        <RecordContextProvider key={id} value={data[id]}>
                            <li>
                                <SimpleAccordionMemo
                                    heading={`${item.id} [${item.source.name}]`}
                                    secondaryHeading={`${item.client.full_name} ${item.order_status.name}`}
                                >
                                    <ListItem
                                        button
                                        component={Link}
                                        to={`${linkToRecord(basePath, id)}/show`}
                                        className={classes.link}
                                    >
                                        <div>sdfdsf</div>
                                    </ListItem>
                                </SimpleAccordionMemo>
                            </li>
                        </RecordContextProvider>
                    );
                })}
            </List>
        )
    );
};

OrderMobileGrid.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    leftAvatar: PropTypes.func,
    leftIcon: PropTypes.func,
    linkType: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.func]),
    primaryText: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    rightAvatar: PropTypes.func,
    rightIcon: PropTypes.func,
    secondaryText: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    tertiaryText: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    rowStyle: PropTypes.func,
};

export default OrderMobileGrid;
