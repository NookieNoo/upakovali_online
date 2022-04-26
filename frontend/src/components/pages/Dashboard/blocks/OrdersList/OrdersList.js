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
} from 'react-admin';
import CustomizableDatagrid from 'ra-customizable-datagrid';

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

    return (
        // <Card style={{ width: '100%' }}>
        //     <CardHeader title="Список заказов" />
        //     <List dense={true}>
        //         {orderList.map((it, index) => (
        //             <ListItem key={index}>
        //                 <ListItemAvatar>
        //                     <Avatar />
        //                 </ListItemAvatar>
        //                 <ListItemText primary={it.date1} secondary={it.p + ' ' + it.c} />
        //                 <ListItemSecondaryAction>{it.price}</ListItemSecondaryAction>
        //             </ListItem>
        //         ))}
        //     </List>
        // </Card>
        // <ListContextProvider value={listContext}>
        <ListBase basePath={basePath} resource="order" filter={filterOrders}>
            <CardHeader title="Список заказов на сегодня" />
            {/* <SimpleList
                primaryText={(record) => 'Клиент: ' + record.client.full_name}
                secondaryText={(record) => 'Мастер: ' + record.master.full_name}
                tertiaryText={(record) => record.issue_date}
                linkType={false}
                rowStyle={postRowStyle}
            /> */}
            <CustomizableDatagrid isRowSelectable={() => false} rowClick="show" defaultColumns={defaultColumns}>
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
