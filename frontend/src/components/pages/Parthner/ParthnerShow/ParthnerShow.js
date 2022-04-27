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
    ArrayField,
    Datagrid,
    ChipField,
    BooleanField,
    useShowController,
    useRecordContext,
    DateField,
    Pagination
} from 'react-admin';
import { ShowSplitter, SimpleAccordionMemo } from '@app-universal';
import { useHasAccess } from '@app-hooks';
import { ExpandActivityBlock } from '@app-universal';

const filterByCauser = { causer_type: 'parthner' };
const filterBySubject = { subject_type: 'parthner' };

export default function ParhtnerShow(props) {
    const { record } = useShowController(props);
    const { list: canWatchActivity } = useHasAccess('activity');
    // const data = useRecordContext({record});
    // console.log('data', data);
    return (
        <Show {...props} component="div">
            <ShowSplitter
                leftSide={
                    <SimpleShowLayout>
                        <TextField label="Название" source="full_name" />
                        <EmailField label="Email" source="email" />
                        <TextField label="Телефон" source="phone" />
                        <TextField label="Менеджер" source="manager.full_name" />
                        <RichTextField label="parthner_hash @FIXME открыто для теста" source="parthner_hash" />
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
                            {record?.prices?.map((it, index) => (
                                <SimpleAccordionMemo
                                    key={index}
                                    heading={it.name}
                                    secondaryHeading={`${it.start} - ${it.end}`}
                                >
                                    <ArrayField source={`prices[${index}].services`} label="Список прайсов">
                                        <Datagrid>
                                            <TextField source="id" />
                                            <TextField source="name" label="Название" />
                                            <TextField source="sum" label="Цена" />
                                        </Datagrid>
                                    </ArrayField>
                                </SimpleAccordionMemo>
                            ))}
                        </Tab>
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
                                            <DateField label="Дата" source="created_at" showTime />
                                        </Datagrid>
                                    </ReferenceManyField>
                                </div>
                            </Tab>
                        )}
                        {canWatchActivity && (
                            <Tab label="История действий">
                                <div>
                                    <ReferenceManyField
                                        label="Список действий пользователя"
                                        target="causer_id"
                                        reference="activity"
                                        filter={filterByCauser}
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
                                            <DateField label="Дата" source="created_at" showTime />
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
