import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import {
    TextInput,
    ReferenceInput,
    SelectInput,
    ArrayInput,
    SimpleFormIterator,
    NumberInput,
    useTranslate,
    BooleanInput,
} from 'react-admin';
import { Card, CardContent, Box, Grid, Link, Typography, Divider } from '@material-ui/core';
import { useFormState, useField } from 'react-final-form';
import { useSelector } from 'react-redux';
import { getServicesListTotal } from 'store/selectors';
import { userRoles, serviceTypes } from '@app-constants';
import { KladrAutocompleteBlock, AutocompleteWithRef, PhoneInput } from '@app-universal';
import { SelectInputWrap } from '@app-components/overriding';
import TextInputWithScanner from '../../TextInputWithScanner';
import TotalBlock from '../common/TotalBlock';
import ServiceOptionRenderer from './includes/ServiceOptionRenderer';

const defaultSourceSort = { field: 'id', order: 'ASC' };
const masterFilter = { role_id: userRoles.master.id };

const enableGetChoices = (arg) => {
    if (arg.parthner_id) return true;
    return false;
};

export default function MainTab({ validators, canEditForm, isEdit, isCreate }) {
    const { values: formState, ...rest } = useFormState();
    const { input } = useField('external_number');
    const { input: giftsInput, ...rest2 } = useField('gifts');
    const translate = useTranslate();
    const giftsTotal = useSelector(getServicesListTotal(formState.gifts?.map((it) => it?.service_id) || []));
    const additionalTotal = formState.additional_products?.reduce((pr, cur) => pr + cur?.price || 0, 0);

    const onChangeNumber = (props) => {
        input.onChange(props);
    };

    const [servicesFilter, setServicesFilter] = useState({ product_id: serviceTypes.PACKAGE.id });

    useEffect(() => {
        console.log('CHANGE PARTHNER_ID', formState.parthner_id);
        setServicesFilter((pr) => ({ ...pr, parthner_id: formState.parthner_id }));
        if (isCreate) {
            if (giftsInput.value) {
                giftsInput.onChange(giftsInput.value.map((it) => omit(it, 'service_id')));
            }
        }
    }, [formState.parthner_id]);

    console.log('formState', formState);
    return (
        <>
            <Box display={'flex'} flexDirection={'column'} width={'265px'}>
                <ReferenceInput label="Источник" sort={defaultSourceSort} source="source_id" reference="source">
                    <SelectInputWrap
                        disabled={isEdit}
                        optionText="name"
                        optionValue="id"
                        validate={validators.source_id}
                        {...(isCreate && { getDefaultValue: (choices) => choices[0].id })}
                    />
                </ReferenceInput>
                {isEdit && (
                    <ReferenceInput label="Статус" source="order_status_id" reference="order_status">
                        <SelectInput optionText="name" optionValue="id" validate={validators.order_status_id} />
                    </ReferenceInput>
                )}
            </Box>
            <AutocompleteWithRef
                label="Партнер"
                source="parthner_id"
                reference="parthner"
                disabled={isEdit}
                validate={validators.parthner_id}
            />

            <Typography>Клиент</Typography>
            <Divider />
            {isCreate ? (
                <>
                    <BooleanInput label="Новый клиент?" source="is_new_client" />
                    {formState.is_new_client ? (
                        <Grid container justifyContent="flex-start" spacing={1}>
                            <Grid item>
                                <TextInput
                                    source="client.full_name"
                                    label="ФИО клиента"
                                    validate={validators['client.full_name']}
                                />
                            </Grid>
                            <Grid item>
                                <PhoneInput
                                    source="client.phone"
                                    label="Телефон"
                                    validate={validators['client.phone']}
                                />
                            </Grid>
                            <Grid item>
                                <TextInput source="client.email" label="Email" validate={validators['client.email']} />
                            </Grid>
                        </Grid>
                    ) : (
                        <AutocompleteWithRef
                            label="Клиент"
                            source="client_id"
                            reference="client"
                            disabled={isEdit}
                            validate={validators.client_id}
                        />
                    )}
                </>
            ) : (
                <AutocompleteWithRef
                    label="Клиент"
                    source="client_id"
                    reference="client"
                    disabled={true}
                    validate={validators.client_id}
                />
            )}

            {/* <Typography>Получатель</Typography>
            <Divider />

            {isCreate ? (
                <>
                    <BooleanInput label="Клиент = Получатель?" source="is_receiver_same" />
                    {!formState.is_receiver_same && (
                        <>
                            <BooleanInput label="Новый получатель?" source="is_new_receiver" />
                            {formState.is_new_receiver ? (
                                <Grid container justifyContent="flex-start" spacing={1}>
                                    <Grid item>
                                        <TextInput source="receiver.full_name" label="ФИО получателя" />
                                    </Grid>
                                    <Grid item>
                                        <PhoneInput source="receiver.phone" label="Телефон" />
                                    </Grid>
                                    <Grid item>
                                        <TextInput source="receiver.email" label="Email" />
                                    </Grid>
                                </Grid>
                            ) : (
                                <AutocompleteWithRef
                                    label="Получатель"
                                    source="receiver_id"
                                    reference="client"
                                    validate={validators.receiver_id}
                                />
                            )}
                        </>
                    )}
                </>
            ) : (
                <AutocompleteWithRef
                    label="Получатель"
                    source="receiver_id"
                    reference="client"
                    validate={validators.receiver_id}
                />
            )} */}

            <Divider />

            <Box display={'flex'} flexDirection={'column'} width={'265px'}>
                <TextInputWithScanner
                    source="external_number"
                    label="Внешний номер"
                    disabled={isEdit}
                    validate={validators.external_number}
                    onSubmit={onChangeNumber}
                    scannerModalProps={{ submitKeyLabel: translate('ra.action.save') }}
                />
                <ReferenceInput label="Мастерская" source="workshop_id" reference="workshop" disabled={isEdit}>
                    <SelectInput optionText="address" optionValue="id" validate={validators.workshop_id} />
                </ReferenceInput>
                <AutocompleteWithRef
                    label="Мастер"
                    source="master_id"
                    reference="user"
                    disabled={isEdit ? !canEditForm : false}
                    filter={masterFilter}
                    validate={validators.master_id}
                />
            </Box>

            <ArrayInput source="gifts" label="Подарки" validate={validators.gifts}>
                <SimpleFormIterator>
                    <NumberInput source="weight" label="Вес (кг)" validate={validators['gifts.weight']} />
                    <NumberInput source="length" label="Длина (см)" min={1} validate={validators['gifts.length']} />
                    <NumberInput source="width" label="Ширина (см)" min={1} validate={validators['gifts.width']} />
                    <NumberInput source="height" label="Высота (см)" min={1} validate={validators['gifts.height']} />
                    <ReferenceInput label="Кому" source="addressee_id" reference="addressee">
                        <SelectInput optionText="name" optionValue="id" validate={validators['gifts.addressee_id']} />
                    </ReferenceInput>
                    <ReferenceInput
                        label="Сервис"
                        source="service_id"
                        reference="service"
                        filter={servicesFilter}
                        enableGetChoices={enableGetChoices}
                        disabled={!!!formState.parthner_id}
                    >
                        <SelectInput
                            optionText={ServiceOptionRenderer}
                            optionValue="id"
                            validate={validators['gifts.service_id']}
                        />
                    </ReferenceInput>
                </SimpleFormIterator>
            </ArrayInput>

            <ArrayInput
                source="additional_products"
                label="Дополнительные товары"
                validate={validators.additional_products}
            >
                <SimpleFormIterator>
                    <TextInput source="name" label="Название" validate={validators['additional_products.name']} />
                    <NumberInput
                        source="price"
                        min={0}
                        label="Стоимость"
                        validate={validators['additional_products.price']}
                    />
                </SimpleFormIterator>
            </ArrayInput>
            <TotalBlock
                giftsTotal={giftsTotal}
                additionalTotal={additionalTotal}
                deliveryTotal={formState.is_deliverable ? formState.delivery_price : 0}
                pickupTotal={formState.is_pickupable ? formState.pick_up_price : 0}
            />
        </>
    );
}

MainTab.propTypes = {
    validators: PropTypes.object,
    canEditForm: PropTypes.bool,
    isEdit: PropTypes.bool.isRequired,
    isCreate: PropTypes.bool.isRequired,
};
