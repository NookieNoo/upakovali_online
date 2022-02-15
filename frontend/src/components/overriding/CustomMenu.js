import * as React from 'react';
import { DashboardMenuItem, Menu, MenuItemLink } from 'react-admin';
import {
    ClientIcon,
    ParthnerIcon,
    OrderIcon,
    UserIcon,
    AnalyticsIcon,
    PriceIcon,
    WorkshopIcon,
    AddresseeIcon,
    ProductIcon,
    SourceIcon,
} from '@app-pages';
import { useHasAccess } from '@app-hooks';

export const CustomMenu = (props) => {
    const { enabled: hasAccessToClient } = useHasAccess('client');
    const { enabled: hasAccessToParthner } = useHasAccess('parthner');
    const { enabled: hasAccessToOrder } = useHasAccess('order');
    const { enabled: hasAccessToUser } = useHasAccess('user');
    const { enabled: hasAccessToAnalytics } = useHasAccess('analytics');
    const { enabled: hasAccessToPrice } = useHasAccess('price');
    const { show: hasAccessToWorkshop } = useHasAccess('workshop');
    const { enabled: hasAccessToAddressee } = useHasAccess('addressee');
    const { enabled: hasAccessToProduct } = useHasAccess('product');
    const { show: hasAccessToSource } = useHasAccess('source');

    return (
        <Menu {...props}>
            <DashboardMenuItem />
            {hasAccessToClient && <MenuItemLink to="/client" primaryText="Клиенты" leftIcon={<ClientIcon />} />}
            {hasAccessToParthner && <MenuItemLink to="/parthner" primaryText="Партнеры" leftIcon={<ParthnerIcon />} />}
            {hasAccessToOrder && <MenuItemLink to="/order" primaryText="Заказы" leftIcon={<OrderIcon />} />}
            {hasAccessToUser && <MenuItemLink to="/user" primaryText="Пользователи" leftIcon={<UserIcon />} />}
            {hasAccessToAnalytics && (
                <MenuItemLink to="/analytics" primaryText="Аналитика" leftIcon={<AnalyticsIcon />} />
            )}
            {hasAccessToPrice && <MenuItemLink to="/price" primaryText="Прайсы" leftIcon={<PriceIcon />} />}
            {hasAccessToWorkshop && (
                <MenuItemLink to="/workshop" primaryText="Мастерские" leftIcon={<WorkshopIcon />} />
            )}
            {hasAccessToAddressee && (
                <MenuItemLink to="/addressee" primaryText="Адресаты" leftIcon={<AddresseeIcon />} />
            )}
            {hasAccessToProduct && <MenuItemLink to="/product" primaryText="ServiceType" leftIcon={<ProductIcon />} />}
            {hasAccessToSource && <MenuItemLink to="/source" primaryText="Источники" leftIcon={<SourceIcon />} />}
        </Menu>
    );
};
