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
    Pagination,
} from 'react-admin';
import { ShowSplitter, SimpleAccordionMemo } from '@app-universal';
import { useHasAccess } from '@app-hooks';
import { ExpandActivityBlock, DateFieldLocalized } from '@app-universal';
import { formatDateTime } from '@app-helpers';
import { makeStyles } from '@material-ui/core/styles';

const filterByCauser = { causer_type: 'parthner' };
const filterBySubject = { subject_type: 'parthner' };
const useStyles = makeStyles(theme => ({
    styleTabbedShowLayout: {
        "@media (max-width: 480px) and (min-width: 320px) ": {
            width: '100vw',
            '& div': {
                flexWrap: 'wrap',
            }
        }
    },
    tab: {
        "@media (max-width: 480px) and (min-width: 320px) ": {
            width: '100vw',
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
}));

export default function ParhtnerShow(props) {
    const { record } = useShowController(props);
    const { list: canWatchActivity } = useHasAccess('activity');
    const classes = useStyles();
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
                        <TextField label="Менеджер" source="manager" />
                        <TextField label="Url для уведомлений" source="notification_url" />
                        <RichTextField label="Комментарий" source="comment" />
                    </SimpleShowLayout>
                }
                rightSide={
                    <TabbedShowLayout className={classes.styleTabbedShowLayout}>
                        <Tab className={classes.tab} label="Заказы">
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
                        <Tab label="Прайсы" className={classes.tab} >
                            {record?.prices?.map((it, index) => (
                                <SimpleAccordionMemo
                                    key={index}
                                    heading={it.name}
                                    secondaryHeading={`${formatDateTime(it.start)} - ${formatDateTime(it.end)}`}
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
                            <Tab label="История изменений" className={classes.tab}>
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
                                            <DateFieldLocalized
                                                showLabel={false}
                                                label="Дата"
                                                source="created_at"
                                                showTime
                                            />
                                        </Datagrid>
                                    </ReferenceManyField>
                                </div>
                            </Tab>
                        )}
                        {canWatchActivity && (
                            <Tab label="История действий" className={classes.tab}>
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
                                            <DateFieldLocalized
                                                showLabel={false}
                                                label="Дата"
                                                source="created_at"
                                                showTime
                                            />
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
