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
import { List as RaList, ListBase, SimpleList, useListContext } from 'react-admin';

const postRowStyle = (record, index) => ({
    backgroundColor: record.nb_views >= 500 ? '#efe' : 'white',
});

export function OrdersList(props) {
    const { basePath } = useListContext();
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
        <ListBase basePath={basePath} resource="order">
            <CardHeader title="Список заказов на сегодня" />
            <SimpleList
                primaryText={(record) => 'Клиент: ' + record.client.full_name}
                secondaryText={(record) => 'Мастер: ' + record.master.full_name}
                tertiaryText={(record) => record.issue_date}
                linkType={false}
                rowStyle={postRowStyle}
            />
        </ListBase>
    );
}
