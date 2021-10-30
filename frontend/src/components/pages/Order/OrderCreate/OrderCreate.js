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
import { userRoles } from '@app-constants';
import { createOrderFormValidators } from '@app-helpers';
import { KladrAutocompleteBlock } from '@app-universal';
import { SelectInputWrap } from '@app-components/overriding';

const courierFilter = { role_id: userRoles.courier.id };
const masterFilter = { role_id: userRoles.master.id };

export default function OrderCreate(props) {
    return (
        <Create {...props} title="Создание заказа">
            <TabbedForm validate={createOrderFormValidators.submit}>
                <FormTab label="Основное">
                    <ReferenceInput label="Источник" source="source_id" reference="source">
                        <SelectInputWrap
                            optionText="name"
                            optionValue="id"
                            validate={createOrderFormValidators.source_id}
                            getDefaultValue={(choices) => choices[0].id}
                        />
                    </ReferenceInput>
                    <ReferenceInput label="Партнер" source="parthner_id" reference="parthner">
                        <SelectInput
                            optionText="full_name"
                            optionValue="id"
                            validate={createOrderFormValidators.parthner_id}
                        />
                    </ReferenceInput>
                    <TextInput
                        source="external_number"
                        label="Внешний номер"
                        validate={createOrderFormValidators.external_number}
                    />
                    <ReferenceInput label="Клиент" source="client_id" reference="client">
                        <SelectInput
                            optionText="full_name"
                            optionValue="id"
                            validate={createOrderFormValidators.client_id}
                        />
                    </ReferenceInput>
                    <ReferenceInput label="Мастерская" source="workshop_id" reference="workshop">
                        <SelectInput
                            optionText="address"
                            optionValue="id"
                            validate={createOrderFormValidators.workshop_id}
                        />
                    </ReferenceInput>
                    <ArrayInput source="gifts" label="Подарки" validate={createOrderFormValidators.gifts}>
                        <SimpleFormIterator>
                            <TextInput
                                source="weight"
                                label="Вес (кг)"
                                validate={createOrderFormValidators['gifts.weight']}
                            />
                            <ReferenceInput label="Кому" source="addressee_id" reference="addressee">
                                <SelectInput
                                    optionText="name"
                                    optionValue="id"
                                    validate={createOrderFormValidators['gifts.addressee_id']}
                                />
                            </ReferenceInput>
                            <ReferenceInput label="Размер подарка (см)" source="service_id" reference="service">
                                <SelectInput
                                    optionText="name"
                                    optionValue="id"
                                    validate={createOrderFormValidators['gifts.service_id']}
                                />
                            </ReferenceInput>
                        </SimpleFormIterator>
                    </ArrayInput>
                </FormTab>

                {/* Размер из прайса */}
                <FormTab label="Доставка">
                    <ReferenceInput label="Кому" source="addressee_id" reference="addressee">
                        <SelectInput
                            optionText="name"
                            optionValue="id"
                            validate={createOrderFormValidators.addressee_id}
                        />
                    </ReferenceInput>

                    <BooleanInput
                        label="Забор"
                        source="is_pickupable"
                        validate={createOrderFormValidators.is_pickupable}
                        initialValue={false}
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
                        initialValue={false}
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

                    <ReferenceInput
                        label="Курьер принимающий"
                        source="courier_receiver_id"
                        reference="user"
                        filter={courierFilter}
                    >
                        <SelectInput
                            optionText="full_name"
                            optionValue="id"
                            validate={createOrderFormValidators.courier_receiver_id}
                        />
                    </ReferenceInput>

                    <ReferenceInput
                        label="Курьер выдающий"
                        source="courier_issuer_id"
                        reference="user"
                        filter={courierFilter}
                    >
                        <SelectInput
                            optionText="full_name"
                            optionValue="id"
                            validate={createOrderFormValidators.courier_issuer_id}
                        />
                    </ReferenceInput>

                    {/* Цена */}

                    <BooleanInput
                        label="Оплачено"
                        source="isPaid"
                        validate={createOrderFormValidators.isPaid}
                        initialValue={false}
                    />
                    <ReferenceInput label="Мастер" source="master_id" reference="user" filter={masterFilter}>
                        <SelectInput
                            optionText="full_name"
                            optionValue="id"
                            validate={createOrderFormValidators.master_id}
                        />
                    </ReferenceInput>
                    <ReferenceInput label="Получатель" source="receiver_id" reference="client">
                        <SelectInput
                            optionText="full_name"
                            optionValue="id"
                            validate={createOrderFormValidators.receiver_id}
                        />
                    </ReferenceInput>
                </FormTab>

                <FormTab label="Файлы">
                    <ImageInput
                        source="order_photos"
                        label="Фото к заказу"
                        accept="image/*"
                        placeholder={<p>Прикрепите фото здесь</p>}
                    >
                        <ImageField source="src" title="title" />
                    </ImageInput>
                </FormTab>
            </TabbedForm>
        </Create>
    );
}
