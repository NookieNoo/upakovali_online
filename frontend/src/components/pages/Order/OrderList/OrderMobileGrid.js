import * as React from 'react';
import { isValidElement, ReactNode, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { TextField, BooleanField, DateField, ChipField, EditButton } from 'react-admin';
import { linkToRecord, sanitizeListRestProps, useListContext, RecordContextProvider } from 'ra-core';
import { SimpleAccordionMemo } from '@app-universal';
import { Card, CardContent, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    tertiary: { float: 'right', opacity: 0.541176 },
    name: 'RaSimpleList',
    loader: {
        backgroundColor: '#E0E0E0',
        border: '1px solid #E0E0E0',
        borderRadius: '4px',
        margin: '10px',
        height: '91px',
    },
    editBtn: {
        width: '24px',
        height: '24px',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
}));

const OrderMobileGrid = (props) => {
    const {
        className,
        classes: classesOverride,
        leftAvatar,
        leftIcon,
        linkType = 'edit',
        primaryText,
        rightAvatar,
        rightIcon,
        secondaryText,
        tertiaryText,
        useTranslate,
        rowStyle,
        ...rest
    } = props;

    const { basePath, data, ids, loaded, total, perPage } = useListContext(props);
    const classes = useStyles(props);

    const times = (nbChildren, fn) => Array.from({ length: nbChildren }, (_, key) => fn(key));

    if (loaded === false) {
        return (
            <List>
                {times(perPage, (key) => (
                    <Box key={key} className={classes.loader} />
                ))}
            </List>
        );
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
                                        <Card>
                                            <CardContent>
                                                <Typography variant="body2">
                                                    <span>Мастерская:&nbsp;</span>
                                                    <TextField label="Мастерская" source="workshop.address" />
                                                </Typography>
                                                <Typography variant="body2">
                                                    <span>Забор:&nbsp;</span>
                                                    <BooleanField label="Забор" source="is_pickupable" />
                                                </Typography>
                                                <Typography variant="body2">
                                                    <span>Доставка:&nbsp;</span>
                                                    <BooleanField label="Доставка" source="is_deliverable" />
                                                </Typography>
                                                <Typography variant="body2">
                                                    <span>Дата приема:&nbsp;</span>
                                                    <DateField label="Дата приема" source="receiving_date" />
                                                </Typography>
                                                <Typography variant="body2">
                                                    <span>Дата выдачи:&nbsp;</span>
                                                    <DateField label="Дата выдачи" source="issue_date" />
                                                </Typography>
                                                <Typography variant="body2">
                                                    <span>Комментарий:&nbsp;</span>
                                                    <TextField label="Комментарий" source="comment" />
                                                </Typography>
                                                <Typography variant="body2">
                                                    <span>Курьер приема:&nbsp;</span>
                                                    <TextField
                                                        label="Курьер приема"
                                                        source="courier_receiver.full_name"
                                                    />
                                                </Typography>
                                                <Typography variant="body2">
                                                    <span>Курьер выдачи:&nbsp;</span>
                                                    <TextField
                                                        label="Курьер выдачи"
                                                        source="courier_issuer.full_name"
                                                    />
                                                </Typography>
                                                <Typography variant="body2">
                                                    <span>Оплачено:&nbsp;</span>
                                                    <BooleanField label="Оплачено" source="isPaid" />
                                                </Typography>
                                                <Typography variant="body2">
                                                    <span>Мастер:&nbsp;</span>
                                                    <TextField label="Мастер" source="master.full_name" />
                                                </Typography>
                                                <Typography variant="body2">
                                                    <span>Получатель:&nbsp;</span>
                                                    <TextField label="Получатель" source="receiver.full_name" />
                                                </Typography>
                                                <span>Статус:&nbsp;</span>
                                                <ChipField label="Статус" source="order_status.name" />
                                            </CardContent>
                                        </Card>
                                    </ListItem>
                                    <EditButton record={data[id]} className={classes.editBtn} />
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
