import * as React from 'react';
import { isPlainObject, isEmpty } from 'lodash';
import {
    Show,
    ImageField,
    TextField,
    RichTextField,
    ArrayField,
    BooleanField,
    DateField,
    TabbedShowLayout,
    Tab,
    Datagrid,
    useShowController,
    ReferenceManyField,
    Pagination,
    FunctionField,
} from 'react-admin';
import Aside from './Aside';
import { OrderShowActions } from './includes/OrderShowActions';
import { useHasAccess } from '@app-hooks';
import { ExpandActivityBlock, DateFieldLocalized } from '@app-universal';
import { formatMoney } from '@app-helpers';
import { sourceTypes } from '@app-constants';
import { makeStyles } from '@material-ui/core/styles';

const renderTotal = (it) => formatMoney(it.total);

const filter = { subject_type: 'order' };

const useStyles = makeStyles(theme => ({
       orderMedia: {
            '@media (max-width: 985px) and (min-width: 320px)': {
                '& div': {
                    flexWrap: 'wrap',
                }
            }
       },
       editBtn: {
           '@media (max-width: 985px) and (min-width: 600px)': {
                marginRight: '8%'
           }
       },
       table: {
            '@media (max-width: 400px) and (min-width: 320px)': {
                '& .MuiTab-root': {
                    flexWrap: 'wrap',
                    width: '100vw',
                    marginRight: 'auto',
                    marginLeft: 'auto'
                }
            }
       }
    })
);

const sx = {
    "@media (max-width: 985px) and (min-width: 320px)": {
        margin: '16px 0 0 0',
        width: '100vw'
    }
};

export default function OrderShow(props) {
    const { record, loaded } = useShowController(props);
    const { list: canWatchActivity } = useHasAccess('activity');
    const isFromApi = record?.source_id === sourceTypes.API.value;
    const classes = useStyles();
    console.log('record', record);
    console.log('isFromApi', isFromApi);

    return (
        <Show
            actions={<OrderShowActions className={classes.editBtn} isDataLoaded={loaded} />}
            aside={<Aside sx={sx} history={record?.history} />}
            className={classes.orderMedia}
            {...props}
        >
            <TabbedShowLayout className={classes.table}>
                <Tab label="Общее">
                    <TextField label="Источник" source="source.name" />
                    <TextField label="Статус" source="order_status.name" />
                    {isFromApi && <TextField label="Партнер" source="parthner.full_name" />}
                    {isFromApi && <TextField label="Внешний номер" source="external_number" />}
                    <TextField label="Клиент" source="client.full_name" />
                    <TextField label="Мастерская" source="workshop.address" />
                    <RichTextField label="Комментарий" source="comment" />
                    <ArrayField source="gifts" fieldKey="id" label="Подарки">
                        <Datagrid>
                            <TextField source="id" />
                            <TextField source="weight" label="Вес (кг)" />
                            <TextField source="length" label="Длина (см)" />
                            <TextField source="width" label="Ширина (см)" />
                            <TextField source="height" label="Высота (см)" />
                            <TextField source="addressee.name" label="Кому" />
                            <TextField source="service.name" label="Название услуги" />
                            <TextField source="service.sum" label="Цена" />
                            <TextField source="service.product.name" label="Тип услуги" />
                        </Datagrid>
                    </ArrayField>
                    {!isEmpty(record?.additional_products) && (
                        <ArrayField source="additional_products" fieldKey="id" label="Дополнительные товары">
                            <Datagrid>
                                <TextField source="id" />
                                <TextField source="name" label="Название" />
                                <TextField source="price" label="Цена" />
                            </Datagrid>
                        </ArrayField>
                    )}
                    <FunctionField label="Итоговая стоимость" render={renderTotal} />
                </Tab>
                {/* Размер из прайса */}
                <Tab label="Доставка">
                    <BooleanField label="Забор" source="is_pickupable" />
                    {record?.is_pickupable ? (
                        <TextField label="Точка забора товара" source="pick_up_address" />
                    ) : (
                        <TextField label="Точка забора товара" source="pick_up_point.address" />
                    )}

                    <BooleanField label="Доставка" source="is_deliverable" />
                    {record?.is_deliverable ? (
                        <TextField label="Точка выдачи товара" source="delivery_address" />
                    ) : (
                        <TextField label="Точка выдачи товара" source="delivery_point.address" />
                    )}

                    <DateFieldLocalized label="Время приема" source="receiving_date" showTime />
                    <DateFieldLocalized label="Время выдачи" source="issue_date" showTime />

                    <TextField label="Курьер принимающий" source="courier_receiver.full_name" />
                    <TextField label="Курьер выдающий" source="courier_issuer.full_name" />

                    <BooleanField label="Оплачено" source="isPaid" />
                    <TextField label="Мастер" source="master.full_name" />
                    <TextField label="Получатель" source="receiver.full_name" />
                </Tab>
                <Tab label="Фото">
                    <ImageField label="Фото к заказу" source="order_photos" src="abs_path" title="Фото" />
                </Tab>
                {canWatchActivity && (
                    <Tab label="Логи">
                        <div>
                            <ReferenceManyField
                                label="Список действий пользователя"
                                target="subject_id"
                                reference="activity"
                                filter={filter}
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
        </Show>
    );
}
