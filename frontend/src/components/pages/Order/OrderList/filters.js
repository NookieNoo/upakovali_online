import * as React from 'react';
import { TextInput, ReferenceInput, SelectInput, BooleanInput, DateInput, useTranslate } from 'react-admin';
import { userRoles } from '@app-constants';
import { useField } from 'react-final-form';
import TextInputWithScanner from '../common/TextInputWithScanner';
import { DateRangeInput } from 'components/overriding/react-admin-date-inputs';

const courierFilter = { role_id: userRoles.courier.id };
const masterFilter = { role_id: userRoles.master.id };

const ExternalNumberFilter = ({ source, label, alwaysOn }) => {
    const { input, ...rest2 } = useField('external_number');
    const translate = useTranslate();
    const onChangeNumber = (props) => {
        input.onChange(props);
    };
    return (
        <TextInputWithScanner
            source={source}
            label={label}
            alwaysOn={alwaysOn}
            onSubmit={onChangeNumber}
            scannerInputProps={{ helperText: '' }}
            scannerModalProps={{ submitKeyLabel: translate('app.action.find') }}
        />
    );
};

const adminFilters = [
    <ExternalNumberFilter source="external_number" label="Внешний номер" alwaysOn />,
    <TextInput source="id" label="ID Заказа" alwaysOn />,
    <ReferenceInput label="Источник" source="source_id" reference="source" alwaysOn>
        <SelectInput optionText="name" optionValue="id" />
    </ReferenceInput>,
    <ReferenceInput label="Статус" source="order_status_id" reference="order_status" alwaysOn>
        <SelectInput optionText="name" optionValue="id" />
    </ReferenceInput>,
    <DateRangeInput
        sourceStart="receiving_date_from"
        sourceEnd="receiving_date_to"
        labelStart="Дата приема (начало)"
        labelEnd="Дата приема (конец)"
        label="Дата приема"
        source="receiving_date"
        // alwaysOn
    />,
    <DateRangeInput
        sourceStart="issue_date_from"
        sourceEnd="issue_date_to"
        labelStart="Дата выдачи (начало)"
        labelEnd="Дата выдачи (конец)"
        label="Дата выдачи"
        source="issue_date"
    />,
    // <DateInput label="Дата приема (начало)" source="receiving_date_from" alwaysOn />,
    // <DateInput label="Дата приема (конец)" source="receiving_date_to" alwaysOn />,
    // <DateInput label="Дата выдачи (начало)" source="issue_date_from" alwaysOn />,
    // <DateInput label="Дата выдачи (конец)" source="issue_date_to" alwaysOn />,
    <ReferenceInput label="Партнер" source="parthner_id" reference="parthner">
        <SelectInput optionText="full_name" optionValue="id" />
    </ReferenceInput>,
    <ReferenceInput label="Клиент" source="client_id" reference="client">
        <SelectInput optionText="full_name" optionValue="id" />
    </ReferenceInput>,
    <ReferenceInput label="Мастерская" source="workshop_id" reference="workshop">
        <SelectInput optionText="address" optionValue="id" />
    </ReferenceInput>,
    <ReferenceInput label="Курьер принимающий" source="courier_receiver_id" reference="user" filter={courierFilter}>
        <SelectInput optionText="full_name" optionValue="id" />
    </ReferenceInput>,
    <ReferenceInput label="Курьер выдающий" source="courier_issuer_id" reference="user" filter={courierFilter}>
        <SelectInput optionText="full_name" optionValue="id" />
    </ReferenceInput>,
    <BooleanInput label="Оплачено" source="isPaid" />,
    <ReferenceInput label="Мастер" source="master_id" reference="user" filter={masterFilter}>
        <SelectInput optionText="full_name" optionValue="id" />
    </ReferenceInput>,
    <ReferenceInput label="Получатель" source="receiver_id" reference="client">
        <SelectInput optionText="full_name" optionValue="id" />
    </ReferenceInput>,
];

const courierFilters = [
    <ExternalNumberFilter source="external_number" label="Внешний номер" alwaysOn />,
    <TextInput source="id" label="ID Заказа" alwaysOn />,
    <ReferenceInput label="Источник" source="source_id" reference="source" alwaysOn>
        <SelectInput optionText="name" optionValue="id" />
    </ReferenceInput>,
    <ReferenceInput label="Статус" source="order_status_id" reference="order_status" alwaysOn>
        <SelectInput optionText="name" optionValue="id" />
    </ReferenceInput>,
    <DateRangeInput
        sourceStart="receiving_date_from"
        sourceEnd="receiving_date_to"
        labelStart="Дата приема (начало)"
        labelEnd="Дата приема (конец)"
        label="Дата приема"
        source="receiving_date"
        // alwaysOn
    />,
    <DateRangeInput
        sourceStart="issue_date_from"
        sourceEnd="issue_date_to"
        labelStart="Дата выдачи (начало)"
        labelEnd="Дата выдачи (конец)"
        label="Дата выдачи"
        source="issue_date"
    />,
    // <DateInput label="Дата приема (начало)" source="receiving_date_from" alwaysOn />,
    // <DateInput label="Дата приема (конец)" source="receiving_date_to" alwaysOn />,
    // <DateInput label="Дата выдачи (начало)" source="issue_date_from" alwaysOn />,
    // <DateInput label="Дата выдачи (конец)" source="issue_date_to" alwaysOn />,
    <ReferenceInput label="Мастерская" source="workshop_id" reference="workshop">
        <SelectInput optionText="address" optionValue="id" />
    </ReferenceInput>,
    <ReferenceInput label="Кому" source="addressee_id" reference="addressee" alwaysOn>
        <SelectInput optionText="name" optionValue="id" />
    </ReferenceInput>,
    <BooleanInput label="Оплачено" source="isPaid" />,
    <ReferenceInput label="Получатель" source="receiver_id" reference="client">
        <SelectInput optionText="full_name" optionValue="id" />
    </ReferenceInput>,
];

const masterFilters = [
    <ExternalNumberFilter source="external_number" label="Внешний номер" alwaysOn />,
    <TextInput source="id" label="ID Заказа" alwaysOn />,
    <ReferenceInput label="Источник" source="source_id" reference="source" alwaysOn>
        <SelectInput optionText="name" optionValue="id" />
    </ReferenceInput>,
    <ReferenceInput label="Статус" source="order_status_id" reference="order_status" alwaysOn>
        <SelectInput optionText="name" optionValue="id" />
    </ReferenceInput>,
    <DateRangeInput
        sourceStart="receiving_date_from"
        sourceEnd="receiving_date_to"
        labelStart="Дата приема (начало)"
        labelEnd="Дата приема (конец)"
        label="Дата приема"
        source="receiving_date"
        // alwaysOn
    />,
    <DateRangeInput
        sourceStart="issue_date_from"
        sourceEnd="issue_date_to"
        labelStart="Дата выдачи (начало)"
        labelEnd="Дата выдачи (конец)"
        label="Дата выдачи"
        source="issue_date"
    />,
    // <DateInput label="Дата приема (начало)" source="receiving_date_from" alwaysOn />,
    // <DateInput label="Дата приема (конец)" source="receiving_date_to" alwaysOn />,
    // <DateInput label="Дата выдачи (начало)" source="issue_date_from" alwaysOn />,
    // <DateInput label="Дата выдачи (конец)" source="issue_date_to" alwaysOn />,
    <ReferenceInput label="Мастерская" source="workshop_id" reference="workshop">
        <SelectInput optionText="address" optionValue="id" />
    </ReferenceInput>,
    <BooleanInput label="Оплачено" source="isPaid" />,
    <ReferenceInput label="Получатель" source="receiver_id" reference="client">
        <SelectInput optionText="full_name" optionValue="id" />
    </ReferenceInput>,
];

export { adminFilters, courierFilters, masterFilters };
