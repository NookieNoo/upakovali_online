import * as React from 'react';
import { Edit } from 'react-admin';
import OrderForm from '../common/Form';

export default function OrderEdit(props) {
    return (
        <Edit {...props} mutationMode="pessimistic">
            <OrderForm />
        </Edit>
    );
}
