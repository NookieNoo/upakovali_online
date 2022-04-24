import * as React from 'react';
import {
    Edit,
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
    NumberInput,
} from 'react-admin';
import { editOrderFormValidators } from '@app-helpers';
import { userRoles, serviceTypes } from '@app-constants';
import { KladrAutocompleteBlock, AutocompleteWithRef } from '@app-universal';
import { useFormState } from 'react-final-form';
import { useGetRole } from '@app-hooks';

const courierFilter = { role_id: userRoles.courier.id };
const masterFilter = { role_id: userRoles.master.id };

//TODO Добавить фильтр по партнеру
const deliveryOrPickingFilter = { product_id: serviceTypes.PACKAGE.id };

export default function OrderEdit(props) {
    // const { values } = useFormState();
    const { isAdmin } = useGetRole();

    // const servicesFilter = {};
    // console.log(values);
    return (
        <Edit {...props} mutationMode="pessimistic">
            <TabbedForm validate={editOrderFormValidators.submit} redirect="show">
                <FormTab label="Основное">
                    <ReferenceInput label="Источник" source="source_id" reference="source">
                        <SelectInput
                            disabled={!isAdmin}
                            optionText="name"
                            optionValue="id"
                            validate={editOrderFormValidators.source_id}
                        />
                    </ReferenceInput>
                    <ReferenceInput label="Статус" source="order_status_id" reference="order_status">
                        <SelectInput
                            optionText="name"
                            optionValue="id"
                            validate={editOrderFormValidators.order_status_id}
                        />
                    </ReferenceInput>

                    <AutocompleteWithRef
                        label="Партнер"
                        source="parthner_id"
                        reference="parthner"
                        disabled={!isAdmin}
                        validate={editOrderFormValidators.parthner_id}
                    />

                    <TextInput
                        source="external_number"
                        label="Внешний номер"
                        disabled={!isAdmin}
                        validate={editOrderFormValidators.external_number}
                    />

                    <AutocompleteWithRef
                        label="Клиент"
                        source="client_id"
                        reference="client"
                        disabled={!isAdmin}
                        validate={editOrderFormValidators.client_id}
                    />

                    <ReferenceInput disabled={!isAdmin} label="Мастерская" source="workshop_id" reference="workshop">
                        <SelectInput
                            optionText="address"
                            optionValue="id"
                            validate={editOrderFormValidators.workshop_id}
                        />
                    </ReferenceInput>
                    <ArrayInput source="gifts" label="Подарки" validate={editOrderFormValidators.gifts}>
                        <SimpleFormIterator>
                            <NumberInput
                                source="weight"
                                label="Вес (кг)"
                                validate={editOrderFormValidators['gifts.weight']}
                            />
                            <NumberInput
                                source="length"
                                label="Длина (см)"
                                min={1}
                                validate={editOrderFormValidators['gifts.length']}
                            />
                            <NumberInput
                                source="width"
                                label="Ширина (см)"
                                min={1}
                                validate={editOrderFormValidators['gifts.width']}
                            />
                            <NumberInput
                                source="height"
                                label="Высота (см)"
                                min={1}
                                validate={editOrderFormValidators['gifts.height']}
                            />
                            <ReferenceInput label="Кому" source="addressee_id" reference="addressee">
                                <SelectInput
                                    optionText="name"
                                    optionValue="id"
                                    validate={editOrderFormValidators['gifts.addressee_id']}
                                />
                            </ReferenceInput>
                            <ReferenceInput
                                label="Сервис"
                                source="service_id"
                                reference="service"
                                filter={deliveryOrPickingFilter}
                            >
                                <SelectInput
                                    optionText={(it) => `${it.name} (${it.price.name})`}
                                    optionValue="id"
                                    validate={editOrderFormValidators['gifts.service_id']}
                                />
                            </ReferenceInput>
                        </SimpleFormIterator>
                    </ArrayInput>
                    <ArrayInput
                        source="additional_products"
                        label="Дополнительные товары"
                        validate={editOrderFormValidators.additional_products}
                    >
                        <SimpleFormIterator>
                            <TextInput
                                source="name"
                                label="Название"
                                validate={editOrderFormValidators['additional_products.name']}
                            />
                            <NumberInput
                                source="price"
                                min={0}
                                label="Стоимость"
                                validate={editOrderFormValidators['additional_products.price']}
                            />
                        </SimpleFormIterator>
                    </ArrayInput>
                </FormTab>

                {/* Размер из прайса */}
                <FormTab label="Доставка">
                    <BooleanInput label="Забор" source="is_pickupable" disabled={!isAdmin} />
                    {/* @FIXME На каждое переключение идут запросы */}
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData.is_pickupable ? (
                                <KladrAutocompleteBlock
                                    source="pick_up_address"
                                    label="Адрес забора товара"
                                    disabled={!isAdmin}
                                    validate={editOrderFormValidators.pick_up_address}
                                />
                            ) : (
                                <ReferenceInput
                                    label="Точка забора товара"
                                    source="pick_up_point_id"
                                    reference="workshop"
                                    disabled={!isAdmin}
                                >
                                    <SelectInput
                                        optionText="address"
                                        optionValue="id"
                                        validate={editOrderFormValidators.is_pickupable}
                                    />
                                </ReferenceInput>
                            )
                        }
                    </FormDataConsumer>

                    <BooleanInput
                        label="Доставка"
                        source="is_deliverable"
                        disabled={!isAdmin}
                        validate={editOrderFormValidators.is_deliverable}
                    />

                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            formData.is_deliverable ? (
                                <KladrAutocompleteBlock
                                    source="delivery_address"
                                    label="Адрес выдачи товара"
                                    disabled={!isAdmin}
                                    validate={editOrderFormValidators.delivery_address}
                                />
                            ) : (
                                <ReferenceInput
                                    label="Точка выдачи товара"
                                    source="delivery_point_id"
                                    disabled={!isAdmin}
                                    reference="workshop"
                                >
                                    <SelectInput
                                        optionText="address"
                                        optionValue="id"
                                        validate={editOrderFormValidators.delivery_point_id}
                                    />
                                </ReferenceInput>
                            )
                        }
                    </FormDataConsumer>

                    <DateTimeInput
                        source="receiving_date"
                        label="Время приема"
                        disabled={!isAdmin}
                        validate={editOrderFormValidators.receiving_date}
                    />
                    <DateTimeInput
                        source="issue_date"
                        label="Время выдачи"
                        disabled={!isAdmin}
                        validate={editOrderFormValidators.issue_date}
                    />

                    <TextInput
                        label="Комментарий"
                        source="comment"
                        disabled={!isAdmin}
                        validate={editOrderFormValidators.comment}
                    />

                    <AutocompleteWithRef
                        label="Курьер принимающий"
                        source="courier_receiver_id"
                        reference="user"
                        disabled={!isAdmin}
                        filter={courierFilter}
                        validate={editOrderFormValidators.courier_receiver_id}
                    />

                    <AutocompleteWithRef
                        label="Курьер выдающий"
                        source="courier_issuer_id"
                        reference="user"
                        disabled={!isAdmin}
                        filter={courierFilter}
                        validate={editOrderFormValidators.courier_issuer_id}
                    />

                    {/* Цена */}

                    <BooleanInput
                        label="Оплачено"
                        source="isPaid"
                        disabled={!isAdmin}
                        validate={editOrderFormValidators.isPaid}
                    />

                    <AutocompleteWithRef
                        label="Мастер"
                        source="master_id"
                        reference="user"
                        disabled={!isAdmin}
                        filter={masterFilter}
                        validate={editOrderFormValidators.master_id}
                    />

                    <AutocompleteWithRef
                        label="Получатель"
                        source="receiver_id"
                        reference="client"
                        disabled={!isAdmin}
                        validate={editOrderFormValidators.receiver_id}
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
        </Edit>
    );
}
