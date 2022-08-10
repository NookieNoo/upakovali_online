import * as React from 'react';
import {
    Card,
    CardHeader,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Avatar,
    Typography,
} from '@material-ui/core';
import {
    ListBase,
    SimpleList,
    useListContext,
    TextField,
    useListController,
    ListContextProvider,
    Pagination,
    BooleanField,
    DateField,
    ChipField,
    Datagrid,
} from 'react-admin';
// import CustomizableDatagrid from 'ra-customizable-datagrid';
import { makeStyles } from '@material-ui/core';
import CustomizableDatagrid from 'components/overriding/ra-customizable-datagrid';

const useStyles = makeStyles((theme) => ({
    table: {
        overflowX: 'scroll',
        maxWidth: '100%',
        [theme.breakpoints.down('xs')]: {
            maxWidth: '100vw',
        },
    },
}));

const postRowStyle = (record, index) => ({
    backgroundColor: record.nb_views >= 500 ? '#efe' : 'white',
});

const filterOrders = {
    order_date: new Date().toISOString().slice(0, 10),
};

const defaultColumns = [
    'id',
    'source.name',
    'parthner.full_name',
    'client.full_name',
    'workshop.address',
    'is_pickupable',
    'is_deliverable',
    'isPaid',
    'master.full_name',
    'receiver.full_name',
    'order_status.name',
];

export function OrdersList(props) {
    // const { basePath } = useListContext();
    const basePath = 'order'; //@TODO Проверить работу
    const classes = useStyles();

    return (
        <ListBase basePath={basePath} resource="order" filter={filterOrders} style={{ border: '1px solid red' }}>
            <CardHeader title="Список заказов на сегодня" />
            <CustomizableDatagrid
                isRowSelectable={() => false}
                rowClick="show"
                defaultColumns={defaultColumns}
                customDatagridClasses={classes.table}
            >
                <TextField label="id" source="id" />
                <TextField label="Источник" source="source.name" />
                <TextField label="Партнер" source="parthner.full_name" />
                <TextField label="Клиент" source="client.full_name" />
                <TextField label="Мастерская" source="workshop.address" />
                <BooleanField label="Забор" source="is_pickupable" />
                <BooleanField label="Доставка" source="is_deliverable" />
                {/* Здесь должен быть адрес приема(но он берется из разных источников) */}
                <DateField label="Дата приема" source="receiving_date" />
                <DateField label="Дата выдачи" source="issue_date" />
                <TextField label="Комментарий" source="comment" />
                <TextField label="Курьер приема" source="courier_receiver.full_name" />
                <TextField label="Курьер выдачи" source="courier_issuer.full_name" />
                <TextField label="Сумма" source="total" />
                <BooleanField label="Оплачено" source="isPaid" />
                <TextField label="Мастер" source="master.full_name" />
                <TextField label="Получатель" source="receiver.full_name" />

                <ChipField label="Статус" source="order_status.name" />
            </CustomizableDatagrid>
            <Pagination />
        </ListBase>
    );
}
