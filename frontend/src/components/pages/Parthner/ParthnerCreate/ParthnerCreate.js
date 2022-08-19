import * as React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { createParthnerFormValidators } from '@app-helpers';
import { PhoneInput } from '@app-universal';

export default function ParthnerCreate(props) {

    return (
        <Create {...props} title="Создание партнера">
            <SimpleForm redirect="show">
                <TextInput label="Название" source="full_name" validate={createParthnerFormValidators.full_name} />
                <TextInput label="Email" source="email" validate={createParthnerFormValidators.email} />
                <PhoneInput label="Телефон" source="phone" validate={createParthnerFormValidators.phone} />
                <TextInput label="Url для уведомлений" source="notification_url" validate={createParthnerFormValidators.notification_url} />
                <TextInput label="Комментарий" source="comment" validate={createParthnerFormValidators.comment} />
                <TextInput label="Менеджер" source="manager" validate={createParthnerFormValidators.manager} />
            </SimpleForm>
        </Create>
    );
}
