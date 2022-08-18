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
import { userRoles, serviceTypes, sourceTypes } from '@app-constants';
import { KladrAutocompleteBlock, AutocompleteWithRef, PhoneInput } from '@app-universal';
import { SelectInputWrap } from '@app-components/overriding';
import TextInputWithScanner from '../../TextInputWithScanner';
import TotalBlock from '../common/TotalBlock';
import ServiceOptionRenderer from './includes/ServiceOptionRenderer';
import { VIRTUAL_PARTNER_ID } from '@app-constants';
import { makeStyles } from '@material-ui/core/styles';

const defaultSourceSort = { field: 'id', order: 'ASC' };
const masterFilter = { role_id: userRoles.master.id };

const enableGetChoices = (arg) => {
    if (arg.parthner_id) return true;
    return false;
};

const useStyles = makeStyles(
    theme => ({
        styleInput: {
            width: '275px'
        },
        styleExternalNumber: {
            width: '275px',
            marginLeft: '10px'
        },
        inputPhone: {
            height: '49px',
            width: '275px !important',
            backgroundColor: 'rgba(0, 0, 0, 0.04) !important',
            border: '1px solid white !important',
            borderBottom: '1px solid grey !important',
            borderTopLeftRadius: '4px !important',
            borderTopRightRadius: '4px !important',
            borderBottomLeftRadius: '0 !important',
            borderBottomRightRadius: '0 !important',
            transition: 'background-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms !important',

            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.13) !important',
            },

            '&:focus': {
                boxShadow: 'none !important'
            }

        },
        container: {

            '& div': {
                backgroundColor: 'transparent !important',
            },

            marginTop: '7px',

            '@media (max-width: 644px) and (min-width: 320px)': {
                marginTop: '0',
            }
        }
    })
);
export default function MainTab({ validators, canEditForm, isEdit, isCreate }) {
    const translate = useTranslate();
    const { values: formState, ...rest } = useFormState();
    const { input } = useField('external_number');
    const { input: giftsInput, ...rest2 } = useField('gifts');
    const { input: partnerInput } = useField('parthner_id');
    const giftsTotal = useSelector(getServicesListTotal(formState.gifts?.map((it) => it?.service_id) || []));
    const additionalTotal = formState.additional_products?.reduce((pr, cur) => pr + (cur?.price || 0), 0);
    const isFromApi = formState.source_id === sourceTypes.API.value;

    const onChangeNumber = (props) => {
        input.onChange(props);
    };

    const [servicesFilter, setServicesFilter] = useState({
        product_id: serviceTypes.PACKAGE.id,
        parthner_id: formState.parthner_id,
    });
    const classes = useStyles();

    useEffect(() => {
        // console.log('CHANGE PARTHNER_ID', formState.parthner_id);
        if (!isFromApi) {
            setServicesFilter((pr) => ({ ...pr, parthner_id: VIRTUAL_PARTNER_ID }));
            partnerInput.onChange(undefined);
        } else {
            setServicesFilter((pr) => ({ ...pr, parthner_id: formState.parthner_id }));
        }
        if (isCreate) {
            if (giftsInput.value) {
                giftsInput.onChange(giftsInput.value.map((it) => omit(it, 'service_id')));
            }
        }
    }, [formState.parthner_id, isFromApi]);

    console.log('formState', formState);
    return (
        <>
            <Box display={'flex'} flexDirection={'column'} width={'265px'}>
                <ReferenceInput className={classes.styleInput} label="Источник" sort={defaultSourceSort} source="source_id" reference="source">
                    <SelectInputWrap
                        disabled={isEdit}
                        optionText="name"
                        optionValue="id"
                        validate={validators.source_id}
                        {...(isCreate && { getDefaultValue: (choices) => choices[0].id })}
                    />
                </ReferenceInput>
                {isEdit && (
                    <ReferenceInput className={classes.styleInput} label="Статус" source="order_status_id" reference="order_status">
                        <SelectInput optionText="name" optionValue="id" validate={validators.order_status_id} />
                    </ReferenceInput>
                )}
            </Box>
            {isFromApi && (
                <AutocompleteWithRef
                    className={classes.styleInput}
                    label="Партнер"
                    source="parthner_id"
                    reference="parthner"
                    disabled={isEdit}
                    validate={validators.parthner_id}
                />
            )}

            <Typography>Клиент</Typography>
            <Divider />
            {isCreate ? (
                <>
                    <BooleanInput label="Новый клиент?" source="is_new_client" />
                    {formState.is_new_client ? (
                        <Grid container justifyContent="flex-start" spacing={1}>
                            <Grid item>
                                <TextInput
                                    className={classes.styleInput}
                                    source="client.full_name"
                                    label="ФИО клиента"
                                    validate={validators['client.full_name']}
                                />
                            </Grid>
                            <Grid item>
                                <PhoneInput
                                    containerClass={classes.container}
                                    inputClass={classes.inputPhone}
                                    source="client.phone"
                                    label="Телефон"
                                    validate={validators['client.phone']}
                                />
                            </Grid>
                            <Grid item>
                                <TextInput className={classes.styleInput} source="client.email" label="Email" validate={validators['client.email']} />
                            </Grid>
                        </Grid>
                    ) : (
                        <AutocompleteWithRef
                            className={classes.styleInput}
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
                    className={classes.styleInput}
                    label="Клиент"
                    source="client_id"
                    reference="client"
                    disabled={true}
                    validate={validators.client_id}
                />
            )}

            <Divider />

            <Box display={'flex'} flexDirection={'column'} width={'265px'}>
                {isFromApi && (
                    <TextInputWithScanner
                        className={classes.styleExternalNumber}
                        source="external_number"
                        label="Внешний номер"
                        disabled={isEdit}
                        validate={validators.external_number}
                        onSubmit={onChangeNumber}

                        scannerModalProps={{ submitKeyLabel: translate('ra.action.save') }}
                    />
                )}
                <ReferenceInput className={classes.styleInput} label="Мастерская" source="workshop_id" reference="workshop" disabled={isEdit}>
                    <SelectInput optionText="address" optionValue="id" validate={validators.workshop_id} />
                </ReferenceInput>
                <AutocompleteWithRef
                    className={classes.styleInput}
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
                    <NumberInput className={classes.styleInput} source="weight" label="Вес (кг)" validate={validators['gifts.weight']} />
                    <NumberInput className={classes.styleInput} source="length" label="Длина (см)" min={1} validate={validators['gifts.length']} />
                    <NumberInput className={classes.styleInput} source="width" label="Ширина (см)" min={1} validate={validators['gifts.width']} />
                    <NumberInput className={classes.styleInput} source="height" label="Высота (см)" min={1} validate={validators['gifts.height']} />
                    <ReferenceInput className={classes.styleInput} label="Кому" source="addressee_id" reference="addressee">
                        <SelectInput optionText="name" optionValue="id" validate={validators['gifts.addressee_id']} />
                    </ReferenceInput>
                    <ReferenceInput
                        className={classes.styleInput}
                        label="Сервис"
                        source="service_id"
                        reference="service"
                        // enableGetChoices={enableGetChoices}
                        filter={servicesFilter}
                        disabled={isFromApi ? !!!formState.parthner_id : false}
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
                    <TextInput className={classes.styleInput} source="name" label="Название" validate={validators['additional_products.name']} />
                    <NumberInput
                        className={classes.styleInput}
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
