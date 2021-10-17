import * as React from 'react';
import {
    Show,
    SimpleShowLayout,
    TextField,
    EmailField,
    TabbedShowLayout,
    Tab,
    ReferenceManyField,
    useShowController,
    SimpleList,
    Datagrid,
    ChipField,
    BooleanField,
} from 'react-admin';
import { ShowSplitter } from '@app-universal';
import AvatarShowField from './AvatarShowField';
import { userRoles } from '@app-constants';

export default function UserShow(props) {
    const { record = {} } = useShowController(props);
    const { role: userRole } = record;

    const isCourier = userRole?.id === userRoles.courier.id;
    const isMaster = userRole?.id === userRoles.master.id;

    return (
        <Show {...props} component="div">
            <ShowSplitter
                leftSide={
                    <SimpleShowLayout>
                        <AvatarShowField />
                        <TextField label="ФИО" source="full_name" />
                        <EmailField label="Email" source="email" />
                        <TextField label="Телефон" source="phone" />
                        <TextField label="Роль" source="role.visible_name" />
                    </SimpleShowLayout>
                }
                rightSide={
                    <TabbedShowLayout>
                        {isCourier && (
                            <Tab label="Заказы(принимающий курьер)">
                                <ReferenceManyField
                                    label="Список заказов, отфильтрованный по курьеру"
                                    target="courier_receiver_id"
                                    reference="order"
                                >
                                    <Datagrid isRowSelectable={() => false}>
                                        <TextField label="id" source="id" />
                                        <ChipField label="Статус" source="order_status.name" />
                                        <TextField label="Клиент" source="client.full_name" />
                                        <TextField label="Партнер" source="parthner.full_name" />
                                        <TextField label="Источник" source="source.name" />
                                        <BooleanField label="Оплачено" source="isPaid" />
                                        <TextField label="Комментарий" source="comment" />
                                    </Datagrid>
                                </ReferenceManyField>
                            </Tab>
                        )}
                        {isCourier && (
                            <Tab label="Заказы(выдающий курьер)">
                                <ReferenceManyField
                                    label="Список заказов, отфильтрованный по курьеру"
                                    target="courier_issuer_id"
                                    reference="order"
                                >
                                    <Datagrid isRowSelectable={() => false}>
                                        <TextField label="id" source="id" />
                                        <ChipField label="Статус" source="order_status.name" />
                                        <TextField label="Клиент" source="client.full_name" />
                                        <TextField label="Партнер" source="parthner.full_name" />
                                        <TextField label="Источник" source="source.name" />
                                        <BooleanField label="Оплачено" source="isPaid" />
                                        <TextField label="Комментарий" source="comment" />
                                    </Datagrid>
                                </ReferenceManyField>
                            </Tab>
                        )}
                        {isMaster && (
                            <Tab label="Заказы">
                                <ReferenceManyField
                                    label="Список заказов, отфильтрованный по мастеру"
                                    target="master_id"
                                    reference="order"
                                >
                                    <Datagrid isRowSelectable={() => false}>
                                        <TextField label="id" source="id" />
                                        <ChipField label="Статус" source="order_status.name" />
                                        <TextField label="Клиент" source="client.full_name" />
                                        <TextField label="Партнер" source="parthner.full_name" />
                                        <TextField label="Источник" source="source.name" />
                                        <BooleanField label="Оплачено" source="isPaid" />
                                        <TextField label="Комментарий" source="comment" />
                                    </Datagrid>
                                </ReferenceManyField>
                            </Tab>
                        )}
                        {!isMaster && !isCourier && (
                            <Tab label="Заказы">
                                <TextField label="Заказы отображаются только для курьеров/мастеров" />
                            </Tab>
                        )}
                        <Tab label="Комментарии">
                            <TextField source="comment" label="Здесь должны быть комментарии" />
                        </Tab>
                    </TabbedShowLayout>
                }
            />
        </Show>
    );
}
