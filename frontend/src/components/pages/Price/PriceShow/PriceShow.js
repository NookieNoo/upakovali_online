import * as React from 'react';
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
    SimpleShowLayout,
    NumberField
} from 'react-admin';
import { DateFieldLocalized } from '@app-universal';
// import Aside from './Aside';
// import { OrderShowActions } from './includes/OrderShowActions';

export default function PriceShow(props) {
    const { record, loaded } = useShowController(props);

    return (
        <Show
            // actions={<OrderShowActions isDataLoaded={loaded} />}
            // aside={<Aside history={record?.history} />}
            {...props}
        >
            <SimpleShowLayout>
                <TextField label="Источник" source="name" />
                <DateFieldLocalized label="Действует с" source="start" />
                <DateFieldLocalized label="Действует до" source="end" />
                <TextField label="Партнер" source="parthner.full_name" />
                <ArrayField source="services" fieldKey="id" label="Сервисы">
                    <Datagrid>
                        <TextField source="id" />
                        <TextField source="name" label="Название" />
                        <NumberField source="sum" label="Цена" />
                    </Datagrid>
                </ArrayField>
            </SimpleShowLayout>
        </Show>
    );
}
