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
} from '@material-ui/core';

const orderList = [
    { p: 'Ozon', c: 'Mitlabs', date1: '10/09/2021, 12:53:18', price: '500$' },
    { p: 'Ozon', c: 'Mitlabs', date1: '10/09/2021, 12:53:18', price: '500$' },
    { p: 'Ozon', c: 'Mitlabs', date1: '10/09/2021, 12:53:18', price: '500$' },
    { p: 'Ozon', c: 'Mitlabs', date1: '10/09/2021, 12:53:18', price: '500$' },
    { p: 'Ozon', c: 'Mitlabs', date1: '10/09/2021, 12:53:18', price: '500$' },
    { p: 'Ozon', c: 'Mitlabs', date1: '10/09/2021, 12:53:18', price: '500$' },
    { p: 'Ozon', c: 'Mitlabs', date1: '10/09/2021, 12:53:18', price: '500$' },
];

export function OrdersList() {
    return (
        <Card style={{ width: '100%' }}>
            <CardHeader title="Список заказов" />
            <List dense={true}>
                {orderList.map((it, index) => (
                    <ListItem key={index}>
                        <ListItemAvatar>
                            <Avatar />
                        </ListItemAvatar>
                        <ListItemText primary={it.date1} secondary={it.p + ' ' + it.c} />
                        <ListItemSecondaryAction>{it.price}</ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Card>
    );
}
