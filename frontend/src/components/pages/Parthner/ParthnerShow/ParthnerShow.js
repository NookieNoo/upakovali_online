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
    ArrayField,
    Datagrid,
    ChipField,
    BooleanField,
    useShowController,
    useRecordContext,
} from 'react-admin';
import { ShowSplitter } from '@app-universal';
import { SimpleAccordionMemo } from '@app-universal';

export default function ParhtnerShow(props) {
    const { record } = useShowController(props);
    // const data = useRecordContext({record});
    // console.log('data', data);
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
                            {record?.prices?.map((it, index) => (
                                <SimpleAccordionMemo key={index} heading={it.name}>
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
                    </TabbedShowLayout>
                }
            />
        </Show>
    );
}
