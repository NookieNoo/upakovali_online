import * as React from 'react';
import {
    Show,
    ImageField,
    TextField,
    RichTextField,
    BooleanField,
    DateField,
    TabbedShowLayout,
    Tab,
    useShowController,
} from 'react-admin';
import Aside from './Aside';

export default function OrderShow(props) {
    const { record } = useShowController(props);

    return (
        <Show {...props} aside={<Aside history={record?.history} />}>
            <TabbedShowLayout>
                <Tab label="Общее">
                    <TextField label="Источник" source="source.name" />
                    <TextField label="Статус" source="order_status.name" />
                    <TextField label="Партнер" source="parthner.full_name" />
                    <TextField label="Внешний номер" source="external_number" />
                    <TextField label="Клиент" source="client.full_name" />
                    <TextField label="Мастерская" source="workshop.address" />
                    <RichTextField label="Комментарий" source="comment" />
                </Tab>
                {/* Размер из прайса */}
                <Tab label="Доставка">
                    <TextField label="Кому" source="addressee.name" />
                    <BooleanField label="Забор" source="is_pickupable" />
                    <TextField label="Точка забора товара" source="pick_up_point.address" />
                    <TextField label="Точка забора товара" source="pick_up_address" />

                    <BooleanField label="Доствка" source="is_deliverable" />
                    <TextField label="Точка выдачи товара" source="delivery_point.address" />
                    <TextField label="Точка выдачи товара" source="delivery_address" />

                    <DateField label="Время приема" source="receiving_date" />
                    <DateField label="Время выдачи" source="issue_date" />

                    <TextField label="Курьер принимающий" source="courier_receiver.full_name" />
                    <TextField label="Курьер выдающий" source="courier_issuer.full_name" />

                    <BooleanField label="Оплачено" source="isPaid" />
                    <TextField label="Мастер" source="master.full_name" />
                    <TextField label="Получатель" source="receiver.full_name" />
                </Tab>
                <Tab label="Фото">
                    <ImageField label="Фото к заказу" source="order_photos" src="abs_path" title="Фото" />
                </Tab>
            </TabbedShowLayout>
        </Show>
    );
}
