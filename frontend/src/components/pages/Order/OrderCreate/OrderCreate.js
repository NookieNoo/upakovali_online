import * as React from 'react';
import {
    Create,
    TextInput,
    ReferenceInput,
    SelectInput,
    BooleanInput,
    DateTimeInput,
    FormDataConsumer,
    ImageInput,
    ImageField,
    TabbedForm,
    FormTab,
    ArrayInput,
    SimpleFormIterator,
} from 'react-admin';
import { serviceTypes, userRoles } from '@app-constants';
import { createOrderFormValidators } from '@app-helpers';
import { KladrAutocompleteBlock, AutocompleteWithRef } from '@app-universal';
import { SelectInputWrap } from '@app-components/overriding';
import MainFormBlock from './includes/MainFormBlock';

const courierFilter = { role_id: userRoles.courier.id };
const masterFilter = { role_id: userRoles.master.id };

const initialState = {
    order_photos: [],
    is_pickupable: true,
    is_deliverable: true,
    isPaid: false
}

export default function OrderCreate(props) {
    return (
        <Create {...props} title="Создание заказа">
            <TabbedForm initialValues={initialState} validate={createOrderFormValidators.submit} redirect="show">
                <FormTab label="Основное">
                    <MainFormBlock />
                </FormTab>

                {/* Размер из прайса */}
                <FormTab label="Доставка">
                    <BooleanInput
                        label="Забор"
                        source="is_pickupable"
                        validate={createOrderFormValidators.is_pickupable}
                    />

                    {/* @FIXME На каждое переключение идут запросы */}
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData.is_pickupable ? (
                                <KladrAutocompleteBlock
                                    source="pick_up_address"
                                    label="Адрес забора товара"
                                    validate={createOrderFormValidators.pick_up_address}
                                />
                            ) : (
                                <ReferenceInput
                                    label="Точка забора товара"
                                    source="pick_up_point_id"
                                    reference="workshop"
                                >
                                    <SelectInput
                                        optionText="address"
                                        optionValue="id"
                                        validate={createOrderFormValidators.is_pickupable}
                                    />
                                </ReferenceInput>
                            )
                        }
                    </FormDataConsumer>

                    <BooleanInput
                        label="Доставка"
                        source="is_deliverable"
                        validate={createOrderFormValidators.is_deliverable}
                    />

                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData.is_deliverable ? (
                                <KladrAutocompleteBlock
                                    source="delivery_address"
                                    label="Адрес выдачи товара"
                                    validate={createOrderFormValidators.delivery_address}
                                />
                            ) : (
                                <ReferenceInput
                                    label="Точка выдачи товара"
                                    source="delivery_point_id"
                                    reference="workshop"
                                >
                                    <SelectInput
                                        optionText="address"
                                        optionValue="id"
                                        validate={createOrderFormValidators.delivery_point_id}
                                        // fullWidth
                                    />
                                </ReferenceInput>
                            )
                        }
                    </FormDataConsumer>

                    <DateTimeInput
                        source="receiving_date"
                        label="Время приема"
                        validate={createOrderFormValidators.receiving_date}
                    />
                    <DateTimeInput
                        source="issue_date"
                        label="Время выдачи"
                        validate={createOrderFormValidators.issue_date}
                    />

                    <TextInput label="Комментарий" source="comment" validate={createOrderFormValidators.comment} />

                    <AutocompleteWithRef
                        label="Курьер принимающий"
                        source="courier_receiver_id"
                        reference="user"
                        filter={courierFilter}
                        validate={createOrderFormValidators.courier_receiver_id}
                    />
                    <AutocompleteWithRef
                        label="Курьер выдающий"
                        source="courier_issuer_id"
                        reference="user"
                        filter={courierFilter}
                        validate={createOrderFormValidators.courier_issuer_id}
                    />

                    {/* Цена */}

                    <BooleanInput
                        label="Оплачено"
                        source="isPaid"
                        validate={createOrderFormValidators.isPaid}
                    />

                    <AutocompleteWithRef
                        label="Мастер"
                        source="master_id"
                        reference="user"
                        filter={masterFilter}
                        validate={createOrderFormValidators.master_id}
                    />

                    <AutocompleteWithRef
                        label="Получатель"
                        source="receiver_id"
                        reference="client"
                        validate={createOrderFormValidators.receiver_id}
                    />
                </FormTab>

                <FormTab label="Файлы">
                    <ImageInput
                        source="order_photos"
                        label="Фото к заказу"
                        accept="image/*"
                        placeholder={<p>Прикрепите фото здесь</p>}
                        multiple
                    >
                        <ImageField source="src" title="title" />
                    </ImageInput>
                </FormTab>
            </TabbedForm>
        </Create>
    );
}
