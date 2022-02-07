import * as React from 'react';
import { DashboardMenuItem, Menu, MenuItemLink } from 'react-admin';
import { ClientIcon, ParthnerIcon, OrderIcon, UserIcon, AnalyticsIcon, HandbooksIcon } from '@app-pages';
import { useHasAccess } from '@app-hooks';

export const CustomMenu = (props) => {
    const { enabled: hasAccessToClient } = useHasAccess('client');
    const { enabled: hasAccessToParthner } = useHasAccess('parthner');
    const { enabled: hasAccessToOrder } = useHasAccess('order');
    const { enabled: hasAccessToUser } = useHasAccess('user');
    const { enabled: hasAccessToAnalytics } = useHasAccess('analytics');
    const { enabled: hasAccessToHandbooks } = useHasAccess('handbooks');

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
            {hasAccessToHandbooks && (
                <MenuItemLink to="/handbooks" primaryText="Справочники" leftIcon={<HandbooksIcon />} />
            )}
        </Menu>
    );
};
