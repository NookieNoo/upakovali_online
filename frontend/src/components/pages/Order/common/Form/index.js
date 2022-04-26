import * as React from 'react';
import PropTypes from 'prop-types';
import { TabbedForm, FormTab } from 'react-admin';
import { useGetRole } from '@app-hooks';
import MainTab from './MainTab';
import DeliveryTab from './DeliveryTab';
import FilesTab from './FilesTab';

export default function OrderForm({ validators, isEdit, initialState, ...rest }) {
    const { isAdmin } = useGetRole();
    const canEditForm = isEdit && isAdmin;
    const isCreate = !isEdit;
    return (
        <TabbedForm validate={validators.submit} initialValues={initialState} {...rest} redirect="show">
            <FormTab label="Основное">
                <MainTab validators={validators} canEditForm={canEditForm} isEdit={isEdit} isCreate={isCreate} />
            </FormTab>
            <FormTab label="Доставка">
                <DeliveryTab validators={validators} canEditForm={canEditForm} isEdit={isEdit} isCreate={isCreate} />
            </FormTab>
            <FormTab label="Файлы">
                <FilesTab />
            </FormTab>
        </TabbedForm>
    );
}

OrderForm.defaultProps = {
    isEdit: false,
};

OrderForm.propTypes = {
    validators: PropTypes.object,
    initialState: PropTypes.object,
    isEdit: PropTypes.bool,
};
