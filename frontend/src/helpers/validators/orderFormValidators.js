import { required, maxLength } from 'react-admin';

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
};

export { createOrderFormValidators, editOrderFormValidators };
