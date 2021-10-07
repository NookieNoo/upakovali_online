import * as React from 'react';
import { Show, SimpleShowLayout, TextField, RichTextField, BooleanField, DateField } from 'react-admin';

export default function OrderShow(props) {
    return (
        <Show {...props}>
            <SimpleShowLayout>
                <TextField source="external_number" />
                <TextField source="pick_up_address" />
                <TextField source="delivery_address" />
                <DateField source="receiving_date" />
                <DateField source="issue_date" />
                <DateField source="issue_date" />
                <RichTextField source="comment" />
                <BooleanField source="isPaid" />

            </SimpleShowLayout>
        </Show>
    );
}
