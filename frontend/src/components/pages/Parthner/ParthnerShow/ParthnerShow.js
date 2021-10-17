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

export default function ParhtnerShow(props) {
    return (
        <Show {...props} component="div">
            <ShowSplitter
                leftSide={
                    <SimpleShowLayout>
                        <TextField label="ФИО" source="full_name" />
                        <EmailField label="Email" source="email" />
                        <TextField label="Телефон" source="phone" />
                        <TextField label="Менеджер" source="manager.full_name" />
                        <RichTextField label="Комментарий" source="comment" />
                    </SimpleShowLayout>
                }
                rightSide={
                    <TabbedShowLayout>
                        <Tab label="Заказы">
                            <ReferenceManyField
                                label="Список заказов, отфильтрованный по партнеру"
                                target="parthner_id"
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
                        <Tab label="Прайсы">
                            <TextField source="prices" label="Здесь должны быть прайсы" />
                        </Tab>
                    </TabbedShowLayout>
                }
            />
        </Show>
    );
}
