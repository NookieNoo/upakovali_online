import * as React from 'react';
import PropTypes from 'prop-types';
import {
    TextInput,
    ReferenceInput,
    SelectInput,
    BooleanInput,
    // DateTimeInput,
    FormDataConsumer,
    NumberInput,
} from 'react-admin';
import { Typography, Divider, Box, Grid, Link } from '@material-ui/core';
import { useFormState } from 'react-final-form';
import { useSelector } from 'react-redux';
import { random } from 'lodash';
import { getServicesListTotal } from 'store/selectors';
import { userRoles, serviceTypes } from '@app-constants';
import { KladrAutocompleteBlock, AutocompleteWithRef, PhoneInput } from '@app-universal';
import TotalBlock from '../common/TotalBlock';
import { DateTimeInput } from 'components/overriding/react-admin-date-inputs';
import { makeStyles } from '@material-ui/core/styles';

const randomStringToDisableSafariAutofill = 'fsfd' + random(10000, 99999);
const useStyles = makeStyles(
    theme => ({
        styleInput: {
            width: '275px',
            '& input': {
                width: '250px'
            }
        },
        styleInputWithIcon: {
            '& input': {
                width: '205px'
            }
        },
        inputPhone: {
            height: '49px',
            width: '275px !important',
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

const courierFilter = { role_id: userRoles.courier.id };
export default function DeliveryTab({ validators, canEditForm, isEdit, isCreate }) {
    const { values: formState, ...rest } = useFormState();
    const giftsTotal = useSelector(getServicesListTotal(formState.gifts?.map((it) => it?.service_id) || []));
    const additionalTotal = formState.additional_products?.reduce((pr, cur) => pr + (cur?.price || 0), 0);
    const classes = useStyles();

    return (
        <>
            <BooleanInput
                label="Забор"
                source="is_pickupable"
                validate={validators.is_pickupable}
                disabled={isEdit ? !canEditForm : false}
            />
            <FormDataConsumer>
                {({ formData, ...rest }) =>
                    formData.is_pickupable ? (
                        <>
                            <KladrAutocompleteBlock
                                source="pick_up_address"
                                label="Адрес забора товара"
                                disabled={isEdit ? !canEditForm : false}
                                validate={validators.pick_up_address}
                                className={classes.styleInput}
                            />
                                <NumberInput
                                    source="pick_up_price"
                                    label="Стоимость забора"
                                    min={1}
                                    validate={validators.pick_up_price}
                                    disabled={isEdit}
                                    className={classes.styleInput}
                                />
                        </>
                    ) : (
                        <ReferenceInput
                            label="Точка забора товара"
                            source="pick_up_point_id"
                            reference="workshop"
                            disabled={isEdit ? !canEditForm : false}
                            className={classes.styleInput}
                        >
                            <SelectInput optionText="address" optionValue="id" validate={validators.is_pickupable} />
                        </ReferenceInput>
                    )
                }
            </FormDataConsumer>

            <BooleanInput
                label="Доставка"
                source="is_deliverable"
                disabled={isEdit ? !canEditForm : false}
                validate={validators.is_deliverable}
            />

            <FormDataConsumer>
                {({ formData, ...rest }) =>
                    formData.is_deliverable ? (
                        <>
                            <KladrAutocompleteBlock
                                source="delivery_address"
                                label="Адрес доставки товара"
                                disabled={isEdit ? !canEditForm : false}
                                validate={validators.delivery_address}
                                className={classes.styleInput}
                            />
                            <NumberInput
                                source="delivery_price"
                                label="Стоимость доставки"
                                min={1}
                                validate={validators.delivery_price}
                                disabled={isEdit}
                                className={classes.styleInput}
                            />
                        </>
                    ) : (
                        <ReferenceInput
                            label="Точка выдачи товара"
                            source="delivery_point_id"
                            disabled={isEdit ? !canEditForm : false}
                            reference="workshop"
                            className={classes.styleInput}
                        >
                            <SelectInput
                                optionText="address"
                                optionValue="id"
                                validate={validators.delivery_point_id}
                                classes={classes.styleInput}
                                // fullWidth
                            />
                        </ReferenceInput>
                    )
                }
            </FormDataConsumer>
            <div className={classes.styleInputWithIcon}>
                <Box display={'flex'} flexDirection={'column'} width={'265px'}>
                    <DateTimeInput
                        source="receiving_date"
                        label="Время приема"
                        disabled={isEdit ? !canEditForm : false}
                        validate={validators.receiving_date}
                        inputProps={{ autoComplete: randomStringToDisableSafariAutofill }}
                    />
                    <DateTimeInput
                        source="issue_date"
                        label="Время выдачи"
                        disabled={isEdit ? !canEditForm : false}
                        validate={validators.issue_date}
                        inputProps={{ autoComplete: randomStringToDisableSafariAutofill }}
                    />

                    {/* <AutocompleteWithRef
                        label="Получатель"
                        source="receiver_id"
                        reference="client"
                        disabled={isEdit ? !canEditForm : false}
                        validate={validators.receiver_id}
                    /> */}
                </Box>
            </div>
            <Typography>Получатель</Typography>
            <Divider />
            <Box display={'flex'} flexDirection={'column'}>
                {isCreate ? (
                    <>
                        <BooleanInput label="Клиент = Получатель?" source="is_receiver_same" />
                        {!formState.is_receiver_same && (
                            <>
                                <BooleanInput label="Новый получатель?" source="is_new_receiver" />
                                {formState.is_new_receiver ? (
                                    <Grid container justifyContent="flex-start" spacing={1}>
                                        <Grid item>
                                            <TextInput
                                                source="receiver.full_name"
                                                label="ФИО получателя"
                                                validate={validators['receiver.full_name']}
                                                className={classes.styleInput}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <PhoneInput
                                                source="receiver.phone"
                                                label="Телефон"
                                                containerClass={classes.container}
                                                inputClass={classes.inputPhone}
                                                validate={validators['receiver.phone']}
                                                className={classes.styleInput}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextInput
                                                source="receiver.email"
                                                label="Email"
                                                validate={validators['receiver.email']}
                                                className={classes.styleInput}
                                            />
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <AutocompleteWithRef
                                        label="Получатель"
                                        source="receiver_id"
                                        reference="client"
                                        validate={validators.receiver_id}
                                        className={classes.styleInput}
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
                        className={classes.styleInput}
                    />
                )}
            </Box>
            <Divider />
            <Box display={'flex'} flexDirection={'column'}>
                    <AutocompleteWithRef
                        label="Курьер принимающий"
                        source="courier_receiver_id"
                        reference="user"
                        disabled={isEdit ? !canEditForm : false}
                        filter={courierFilter}
                        validate={validators.courier_receiver_id}
                        className={classes.styleInput}
                    />
                    <AutocompleteWithRef
                        label="Курьер выдающий"
                        source="courier_issuer_id"
                        reference="user"
                        disabled={isEdit ? !canEditForm : false}
                        filter={courierFilter}
                        validate={validators.courier_issuer_id}
                        className={classes.styleInput}
                    />
                {/* Цена */}

                <BooleanInput
                    label="Оплачено"
                    source="isPaid"
                    disabled={isEdit ? !canEditForm : false}
                    validate={validators.isPaid}
                />
                <div className={classes.styleInput}>
                    <TextInput
                        label="Комментарий"
                        source="comment"
                        disabled={isEdit ? !canEditForm : false}
                        validate={validators.comment}
                    />
                </div>
            </Box>
            <TotalBlock
                giftsTotal={giftsTotal}
                additionalTotal={additionalTotal}
                deliveryTotal={formState.is_deliverable ? formState.delivery_price : 0}
                pickupTotal={formState.is_pickupable ? formState.pick_up_price : 0}
            />
        </>
    );
}

DeliveryTab.propTypes = {
    validators: PropTypes.object,
    canEditForm: PropTypes.bool.isRequired,
    isEdit: PropTypes.bool,
    isCreate: PropTypes.bool,
};
