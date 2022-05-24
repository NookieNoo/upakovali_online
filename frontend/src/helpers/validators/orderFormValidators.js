import { required, maxLength, number, minValue, email } from 'react-admin';
import dayjs from 'dayjs';
import { validatePhone } from './functions/validatePhone';

const submitValidator = ({
    is_pickupable,
    is_deliverable,
    delivery_point_id,
    delivery_address,
    pick_up_point_id,
    pick_up_address,
    issue_date,
    receiving_date,
}) => {
    const errors = {};

    if (is_pickupable && !pick_up_address) {
        errors.pick_up_address = 'ra.validation.required';
    }
    if (!is_pickupable && !pick_up_point_id) {
        errors.pick_up_point_id = 'ra.validation.required';
    }

    if (is_deliverable && !delivery_address) {
        errors.delivery_address = 'ra.validation.required';
    }
    if (!is_deliverable && !delivery_point_id) {
        errors.delivery_point_id = 'ra.validation.required';
    }
    const receivingDate = dayjs(receiving_date);
    const issueDate = dayjs(issue_date);
    if (issueDate.isBefore(receivingDate)) {
        errors.issue_date = 'app.validation.issue_date.is_before_receiving';
    }

    return errors;
};

const validateReceivingTime = (dateTime) => {
    let selectedDate = dayjs(dateTime);
    let dateMin = dayjs().add(30, 'm');
    let dateMax = dayjs().add(5, 'd');
    if (selectedDate.isBefore(dateMin)) return 'Не ранее, чем через 30 мин';
    if (selectedDate.isAfter(dateMax)) return 'Не позднее, чем через 5 дней';
    return undefined;
};

const decimalAccuracy = (number) => {
    const accuracy = number.toString().match(/\.(\d+)/)?.[1].length;
    if (accuracy && accuracy > 2) return 'Не больше 2 знаков после запятой';
    return undefined;
};

const createOrderFormValidators = {
    source_id: [required()],
    parthner_id: [required()],
    external_number: [required(), maxLength(255)],
    client_id: [required()],
    'client.full_name': [required(), maxLength(255)],
    'client.phone': [required(), maxLength(50), validatePhone],
    'client.email': [required(), maxLength(255), email()],
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
    pick_up_price: [required(), number(), minValue(1), decimalAccuracy],
    delivery_point_id: [],
    delivery_address: [maxLength(255)],
    delivery_price: [required(), number(), minValue(1), decimalAccuracy],
    receiving_date: [required(), validateReceivingTime],
    issue_date: [required()],
    comment: [],
    courier_receiver_id: [],
    isPaid: [],
    master_id: [],
    receiver_id: [required()],
    'receiver.full_name': [required(), maxLength(255)],
    'receiver.phone': [required(), maxLength(50), validatePhone],
    'receiver.email': [required(), maxLength(255), email()],
    submit: submitValidator,
};

const editOrderFormValidators = {
    source_id: [required()],
    order_status_id: [required()],
    parthner_id: [],
    external_number: [required(), maxLength(255)],
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
