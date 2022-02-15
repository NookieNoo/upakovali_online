import * as React from 'react';
import {
    Show,
    SimpleShowLayout,
    TextField,
    EmailField,
    TabbedShowLayout,
    Tab,
    ReferenceManyField,
    RichTextField,
    SimpleList,
    Datagrid,
    ChipField,
    BooleanField,
} from 'react-admin';
import { ShowSplitter } from '@app-universal';

export default function ClientShow(props) {
    return (
        <Show {...props} component="div">
            <ShowSplitter
                leftSide={
                    <SimpleShowLayout>
                        <TextField label="ФИО" source="full_name" />
                        <EmailField label="Email" source="email" />
                        <TextField label="Телефон" source="phone" />
                        <RichTextField label="Комментарий" source="comment" />
                    </SimpleShowLayout>
                }
                rightSide={
                    <TabbedShowLayout>
                        <Tab label="Заказы(как клиент)">
                            <ReferenceManyField
                                label="Список заказов, отфильтрованный по клиенту"
                                target="client_id"
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
                        <Tab label="Заказы(как получатель)">
                            <ReferenceManyField
                                label="Список заказов, отфильтрованный по клиенту/получателю"
                                target="receiver_id"
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
                        {/* <Tab label="Комментарии">
                            <TextField source="prices" label="Здесь должны быть комментарии по клиенту" />
                        </Tab> */}
                    </TabbedShowLayout>
                }
            />
        </Show>
    );
}
