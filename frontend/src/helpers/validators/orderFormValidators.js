import { required, maxLength, number, minValue } from 'react-admin';
import dayjs from 'dayjs';

const submitValidator = ({
    is_pickupable,
    is_deliverable,
    delivery_point_id,
    delivery_address,
    pick_up_point_id,
    pick_up_address,
}) => {
    const errors = {};

    if (is_pickupable && !pick_up_address) {
        errors.pick_up_address = 'Введите адрес забора';
    }
    if (!is_pickupable && !pick_up_point_id) {
        errors.pick_up_point_id = 'Выберите точку забора';
    }

    if (is_deliverable && !delivery_address) {
        errors.delivery_address = 'Выберите адрес доставки';
    }
    if (!is_deliverable && !delivery_point_id) {
        errors.delivery_point_id = 'Выберите точку доставки';
    }

    return errors;
};

const validateIssueTime = (dateTime) => {
    let selectedDate = dayjs(dateTime);
    let dateMin = dayjs().add(30, 'm');
    let dateMax = dayjs().add(5, 'd');
    if (selectedDate.isBefore(dateMin)) return 'Не ранее, чем через 30 мин';
    if (selectedDate.isAfter(dateMax)) return 'Не позднее, чем через 5 дней';
    return undefined;
};

const createOrderFormValidators = {
    source_id: [required()],
    parthner_id: [],
    external_number: [maxLength(255)],
    client_id: [required()],
    workshop_id: [required()],
    gifts: [required()],
    'gifts.weight': [required(), number(), minValue(0.1)],
    'gifts.length': [required(), number(), minValue(1)],
    'gifts.width': [required(), number(), minValue(1)],
    'gifts.height': [required(), number(), minValue(1)],
    'gifts.addressee_id': [required()],
    'gifts.service_id': [required()],
    additional_products: [],
    'additional_products.name': [maxLength(255)],
    'additional_products.price': [number(), minValue(0.1)],
    pick_up_point_id: [],
    pick_up_address: [maxLength(255)],
    delivery_point_id: [],
    delivery_address: [maxLength(255)],
    receiving_date: [required()],
    issue_date: [required(), validateIssueTime],
    comment: [],
    courier_receiver_id: [],
    isPaid: [],
    master_id: [],
    receiver_id: [required()],
    submit: submitValidator,
};

const editOrderFormValidators = {
    source_id: [required()],
    order_status_id: [required()],
    parthner_id: [],
    external_number: [maxLength(255)],
    client_id: [required()],
    workshop_id: [required()],
    gifts: [required()],
    'gifts.weight': [required(), number(), minValue(0.1)],
    'gifts.length': [required(), number(), minValue(1)],
    'gifts.width': [required(), number(), minValue(1)],
    'gifts.height': [required(), number(), minValue(1)],
    'gifts.addressee_id': [required()],
    'gifts.service_id': [required()],
    additional_products: [],
    'additional_products.name': [maxLength(255)],
    'additional_products.price': [number(), minValue(0.1)],
    pick_up_point_id: [],
    pick_up_address: [maxLength(255)],
    delivery_point_id: [],
    delivery_address: [maxLength(255)],
    receiving_date: [required()],
    issue_date: [required()],
    comment: [],
    courier_receiver_id: [],
    isPaid: [],
    master_id: [],
    receiver_id: [required()],
    submit: submitValidator,
};

export { createOrderFormValidators, editOrderFormValidators };
