import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { useQueryWithStore, Loading, Error } from 'react-admin';
import { YandexMapsBlock } from '@app-universal';
import { useComponentDidUpdate } from '@app-hooks';

export function MapWithOrders() {
    const [workshops, setWorkshops] = useState([]);
    const { loaded, error, data } = useQueryWithStore({
        type: 'getList',
        resource: 'order',
        payload: {
            pagination: { page: 1, perPage: 1000 },
            sort: { field: 'id', sort: 'ASC' },
            filter: { issue_date: new Date().toISOString().slice(0, 10) },
        },
    });
    //TODO Добавить отображение пользовательских адресов
    useEffect(() => {
        let coords = [];
        if (data) {
            coords = data.map(({ pick_up_point }) => {
                return {
                    name: pick_up_point.address,
                    geometry: [pick_up_point.longitude, pick_up_point.latitude],
                };
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
