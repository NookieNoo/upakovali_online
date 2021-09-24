import * as React from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
// import { YandexMapsBlock } from '../../../../universal/maps/YandexMapsBlock';
import { YandexMapsBlock } from '@app-universal';

export function MapWithOrders() {
    return (
        <Card style={{ width: '100%' }}>
            <CardHeader title="Заказы на сегодня"/>
            <CardContent>
                {/* <div style={{ width: "100%", height: 300 }}></div> */}
                <YandexMapsBlock />
            </CardContent>
        </Card>
    );
}
