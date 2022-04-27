import { required, maxLength, minValue } from 'react-admin';
import dayjs from 'dayjs';

const submitValidator = ({ start, end }) => {
    const errors = {};

    const startDate = dayjs(start);
    const endDate = dayjs(end);

    if (endDate.isBefore(startDate)) {
        errors.end = 'Не ранее даты начала';
    }

    return errors;
};

const createPriceFormValidators = {
    name: [required(), maxLength(255)],
    start: [required()],
    end: [required()],
    parthner_id: [required()],
    services: [required()],
    'services.name': [required(), maxLength(255)],
    'services.sum': [required(), minValue(0)],
    'services.product_id': [required()],
    submit: submitValidator,
};

const editPriceFormValidators = {
    name: [required(), maxLength(255)],
    start: [required()],
    end: [required()],
    parthner_id: [required()],
    services: [required()],
    'services.name': [required(), maxLength(255)],
    'services.sum': [required(), minValue(0)],
    'services.product_id': [required()],
    submit: submitValidator,
};

export { createPriceFormValidators, editPriceFormValidators };
