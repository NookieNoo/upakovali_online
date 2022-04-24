import * as React from 'react';
import { TabbedForm, FormTab } from 'react-admin';
import { editOrderFormValidators } from '@app-helpers';
import MainTab from './MainTab';
import DeliveryTab from './DeliveryTab';
import FilesTab from './FilesTab';

export default function OrderForm(props) {
    return (
        <TabbedForm validate={editOrderFormValidators.submit} redirect="show">
            <FormTab label="Основное" >
                <MainTab />
            </FormTab>
            <FormTab label="Доставка" >
                <DeliveryTab />
            </FormTab>
            <FormTab label="Файлы" >
                <FilesTab />
            </FormTab>
        </TabbedForm>
    );
}
