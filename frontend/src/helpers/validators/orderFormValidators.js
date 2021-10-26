import { required, maxLength } from 'react-admin';

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

const createOrderFormValidators = {
    source_id: [required()],
    parthner_id: [],
    external_number: [maxLength(255)],
    client_id: [required()],
    workshop_id: [required()],
    addressee_id: [required()],
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

const editOrderFormValidators = {
    source_id: [required()],
    order_status_id: [required()],
    parthner_id: [],
    external_number: [maxLength(255)],
    client_id: [required()],
    workshop_id: [required()],
    addressee_id: [required()],
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
