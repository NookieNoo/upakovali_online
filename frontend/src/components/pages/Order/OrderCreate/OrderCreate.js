import * as React from 'react';
import { Create } from 'react-admin';
import { createOrderFormValidators } from '@app-helpers';
import OrderForm from '../common/Form';

const initialState = {
    order_photos: [],
    is_pickupable: true,
    is_deliverable: true,
    isPaid: false,
    is_new_client: false,
    is_receiver_same: true,
    is_new_receiver: false,
};

export default function OrderCreate(props) {
    return (
        <Create {...props}>
            <OrderForm validators={createOrderFormValidators} isEdit={false} initialState={initialState} />
        </Create>
    );
}
