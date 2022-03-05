import { useState, useEffect } from 'react';
import {
    TextInput,
    ReferenceInput,
    SelectInput,
    BooleanInput,
    ArrayInput,
    SimpleFormIterator,
    NumberInput,
} from 'react-admin';
import { serviceTypes } from '@app-constants';
import { createOrderFormValidators } from '@app-helpers';
import { AutocompleteWithRef } from '@app-universal';
import { SelectInputWrap } from '@app-components/overriding';
import { useFormState } from 'react-final-form';
import { Typography, Divider } from '@material-ui/core';
import { PhoneInput } from '@app-universal';
import { Card, CardContent, Box, Grid, Link } from '@material-ui/core';

const defaultSourceSort = { field: 'id', order: 'ASC' };

export default function MainFormBlock(props) {
    const { values: formState, ...rest } = useFormState();

    const [servicesFilter, setServicesFilter] = useState({ product_id: serviceTypes.PACKAGE.id });

    useEffect(() => {
        setServicesFilter((pr) => ({ ...pr, parthner_id: formState.parthner_id }));
    }, [formState.parthner_id]);

    console.log('formState', formState);
    console.log('rest', rest);
    return (
        <>
            <ReferenceInput label="Источник" source="source_id" sort={defaultSourceSort} reference="source">
                <SelectInputWrap
                    optionText="name"
                    optionValue="id"
                    validate={createOrderFormValidators.source_id}
                    getDefaultValue={(choices) => choices[0].id}
                />
            </ReferenceInput>
            <AutocompleteWithRef
                label="Партнер"
                source="parthner_id"
                reference="parthner"
                validate={createOrderFormValidators.parthner_id}
            />
            <Typography>Клиент</Typography>
            <Divider />
            <BooleanInput label="Новый клиент?" source="is_new_client" />
            {formState.is_new_client ? (
                <Grid container justifyContent="flex-start" spacing={1}>
                    <Grid item>
                        <TextInput source="client.full_name" label="ФИО клиента" />
                    </Grid>
                    <Grid item>
                        <PhoneInput source="client.phone" label="Телефон" />
                    </Grid>
                    <Grid item>
                        <TextInput source="client.email" label="Email" />
                    </Grid>
                </Grid>
            ) : (
                <AutocompleteWithRef
                    label="Клиент"
                    source="client_id"
                    reference="client"
                    validate={createOrderFormValidators.client_id}
                />
            )}
            <Typography>Получатель</Typography>
            <Divider />
            <BooleanInput label="Клиент = Получатель?" source="is_receiver_same" />

            {!formState.is_receiver_same && (
                <div>
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
                            validate={createOrderFormValidators.receiver_id}
                        />
                    )}
                </div>
            )}

            <Divider />

            <Box display={'flex'} flexDirection={'column'} width={'265px'}>
                <ReferenceInput label="Мастерская" source="workshop_id" reference="workshop">
                    <SelectInput
                        optionText="address"
                        optionValue="id"
                        validate={createOrderFormValidators.workshop_id}
                    />
                </ReferenceInput>
                <TextInput
                    source="external_number"
                    label="Внешний номер"
                    validate={createOrderFormValidators.external_number}
                />
            </Box>

            {formState.parthner_id && (
                <ArrayInput source="gifts" label="Подарки" validate={createOrderFormValidators.gifts}>
                    <SimpleFormIterator>
                        <NumberInput
                            source="weight"
                            label="Вес (кг)"
                            validate={createOrderFormValidators['gifts.weight']}
                        />
                        <NumberInput
                            source="length"
                            label="Длина (см)"
                            min={1}
                            validate={createOrderFormValidators['gifts.length']}
                        />
                        <NumberInput
                            source="width"
                            label="Ширина (см)"
                            min={1}
                            validate={createOrderFormValidators['gifts.width']}
                        />
                        <NumberInput
                            source="height"
                            label="Высота (см)"
                            min={1}
                            validate={createOrderFormValidators['gifts.height']}
                        />
                        <ReferenceInput label="Кому" source="addressee_id" reference="addressee">
                            <SelectInput
                                optionText="name"
                                optionValue="id"
                                validate={createOrderFormValidators['gifts.addressee_id']}
                            />
                        </ReferenceInput>
                        <ReferenceInput label="Сервис" source="service_id" reference="service" filter={servicesFilter}>
                            <SelectInput
                                // optionText="name"
                                optionText={(it) => `${it.name} (${it.price.name})`}
                                optionValue="id"
                                validate={createOrderFormValidators['gifts.service_id']}
                            />
                        </ReferenceInput>
                    </SimpleFormIterator>
                </ArrayInput>
            )}
            <ArrayInput
                source="additional_products"
                label="Дополнительные товары"
                validate={createOrderFormValidators.additional_products}
            >
                <SimpleFormIterator>
                    <TextInput
                        source="name"
                        label="Название"
                        validate={createOrderFormValidators['additional_products.name']}
                    />
                    <TextInput
                        source="price"
                        label="Стоимость"
                        validate={createOrderFormValidators['additional_products.price']}
                    />
                </SimpleFormIterator>
            </ArrayInput>
        </>
    );
}
