import * as React from 'react';
import { isPlainObject } from 'lodash';
import {
    Show,
    SimpleShowLayout,
    TextField,
    EmailField,
    TabbedShowLayout,
    Tab,
    ReferenceManyField,
    RichTextField,
    Pagination,
    Datagrid,
    ChipField,
    BooleanField,
} from 'react-admin';
import { ShowSplitter } from '@app-universal';
import { useHasAccess } from '@app-hooks';
import { ExpandActivityBlock, DateFieldLocalized } from '@app-universal';

const filterBySubject = { subject_type: 'client' };

export default function ClientShow(props) {
    const { list: canWatchActivity } = useHasAccess('activity');
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
                        {canWatchActivity && (
                            <Tab label="История изменений">
                                <div>
                                    <ReferenceManyField
                                        label="Список действий пользователя"
                                        target="subject_id"
                                        reference="activity"
                                        filter={filterBySubject}
                                        perPage={10}
                                        pagination={<Pagination />}
                                    >
                                        <Datagrid
                                            isRowSelectable={() => false}
                                            isRowExpandable={(row) => isPlainObject(row.properties)}
                                            expand={<ExpandActivityBlock />}
                                        >
                                            <TextField label="id" source="id" />
                                            <TextField label="Описание" source="description" />
                                            <TextField label="Кто" source="causer.full_name" />
                                            <DateFieldLocalized showLabel={false} label="Дата" source="created_at" showTime />
                                        </Datagrid>
                                    </ReferenceManyField>
                                </div>
                            </Tab>
                        )}
                    </TabbedShowLayout>
                }
            />
        </Show>
    );
}
