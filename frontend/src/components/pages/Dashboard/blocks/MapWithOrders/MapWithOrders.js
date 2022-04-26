import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { useQueryWithStore, Loading, Error } from 'react-admin';
import { YandexMapsBlock } from '@app-universal';
import { orderStatuses } from '@app-constants';

export function MapWithOrders() {
    const [workshops, setWorkshops] = useState([]);
    const { loaded, error, data } = useQueryWithStore({
        type: 'getList',
        resource: 'order',
        payload: {
            pagination: { page: 1, perPage: 1000 },
            sort: { field: 'id', sort: 'ASC' },
            filter: { order_date: new Date().toISOString().slice(0, 10) },
        },
    });
    //TODO Добавить отображение пользовательских адресов
    useEffect(() => {
        let coords = [];
        if (data) {
            coords = data.map(({ pick_up_point, order_status, pick_up_address_point, delivery_address_point, delivery_point, is_pickupable, is_deliverable }) => {
                let pointData = {};
                if (order_status.id < orderStatuses.WAS_TAKEN.id) {
                    if (is_pickupable) {
                        pointData.name = pick_up_address_point.address;
                        pointData.geometry = [pick_up_address_point.latitude, pick_up_address_point.longitude];
                    } else {
                        pointData.name = pick_up_point.address;
                        pointData.geometry = [pick_up_point.latitude, pick_up_point.longitude];
                    }
                } else {
                    if (is_deliverable) {
                        pointData.name = pick_up_address_point.address;
                        pointData.geometry = [delivery_address_point.latitude, delivery_address_point.longitude];
                    } else {
                        pointData.name = delivery_point.address;
                        pointData.geometry = [delivery_point.latitude, delivery_point.longitude];
                    }
                }
                return pointData;
            });
        }
        setWorkshops(coords);
    }, [data]);

    console.log('workshops', workshops);
    return (
        <Card style={{ width: '100%' }}>
            <CardHeader title="Заказы на сегодня" />
            <CardContent>
                {/* <div style={{ width: "100%", height: 300 }}></div> */}
                <YandexMapsBlock clustererPoints={workshops.map((it) => it.geometry)} />
            </CardContent>
        </Card>
    );
}
