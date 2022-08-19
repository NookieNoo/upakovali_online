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
import { MenuAccordion } from 'components/universal/accordions/MenuAccordion';
import { useState } from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    styleIcon: {
        width: '40px',
        height: '24px',

        '& svg': {
            color: 'grey',
        },
    },
    styleMenuItem: {
        marginLeft: 15,
        color: 'grey',
    },
    animationArrowOpen: {
        width: '24px',
        height: '24px',
        animation: '$openAccordion .5s',
        transform: 'rotate(90deg)',
    },
    animationArrowClose: {
        width: '24px',
        height: '24px',
        animation: '$closeAccordion .5s',
        transform: 'rotate(0deg)',
    },
    sideBarClose: {
        '& .MuiCollapse-root': {
            width: '55px !important'
        },
        '& .MuiMenuItem-root': {
            marginLeft: '0 !important'
        }
    },
    '@keyframes openAccordion': {
        '0%': {
            transform: 'rotate(0deg)',
        },
        '100%': {
            transform: 'rotate(90deg)',
        },
    },
    '@keyframes closeAccordion': {
        '0%': {
            transform: 'rotate(90deg)',
        },
        '100%': {
            transform: 'rotate(0deg)',
        },
    },
}));

export const CustomMenu = (props) => {
    const { enabled: hasAccessToClient } = useHasAccess('client');
    const { enabled: hasAccessToParthner } = useHasAccess('parthner');
    const { enabled: hasAccessToOrder } = useHasAccess('order');
    const { enabled: hasAccessToUser } = useHasAccess('user');
    const { enabled: hasAccessToAnalytics } = useHasAccess('analytics');
    const { enabled: hasAccessToPrice } = useHasAccess('price');
    const { show: hasAccessToWorkshop } = useHasAccess('workshop');
    const { show: hasAccessToAddressee } = useHasAccess('addressee');
    const { enabled: hasAccessToProduct } = useHasAccess('product');
    const { show: hasAccessToSource } = useHasAccess('source');

    const classes = useStyles();
    const dense = false;

    const [state, setState] = useState({
        menuAccordion: false,
    });

    const handleToggle = (menu) => {
        setState((state) => ({ ...state, [menu]: !state[menu] }));
    };

    const open = useSelector((state) => state.admin.ui.sidebarOpen);

    return (
        <Menu {...props}>
            <DashboardMenuItem />
            {hasAccessToClient && <MenuItemLink to="/client" primaryText="Клиенты" leftIcon={<ClientIcon />} />}
            {hasAccessToParthner && <MenuItemLink to="/parthner" primaryText="Партнеры" leftIcon={<ParthnerIcon />} />}
            {hasAccessToOrder && <MenuItemLink to="/order" primaryText="Заказы" leftIcon={<OrderIcon />} />}
            {hasAccessToUser && <MenuItemLink to="/user" primaryText="Пользователи" leftIcon={<UserIcon />} />}
            {/* {hasAccessToAnalytics && (
                <MenuItemLink to="/analytics" primaryText="Аналитика" leftIcon={<AnalyticsIcon />} />
            )} */}
            {hasAccessToPrice && <MenuItemLink to="/price" primaryText="Прайсы" leftIcon={<PriceIcon />} />}
            <div className={!open ? classes.sideBarClose : ''}>
                <MenuAccordion
                    handleToggle={() => handleToggle('menuAccordion')}
                    isOpen={state.menuAccordion}
                    name="Справочники"
                    icon={
                        <div className={state.menuAccordion ? classes.animationArrowOpen : classes.animationArrowClose}>
                            <ArrowForwardIcon fontSize="medium" />
                        </div>
                    }
                    dense={dense}
                    classes={classes.styleIcon}
                >
                    {hasAccessToWorkshop && (
                        <MenuItemLink
                            className={classes.styleMenuItem}
                            dense={dense}
                            to="/workshop"
                            primaryText="Мастерские"
                            leftIcon={<WorkshopIcon />}
                        />
                    )}
                    {hasAccessToAddressee && (
                        <MenuItemLink
                            className={classes.styleMenuItem}
                            dense={dense}
                            to="/addressee"
                            primaryText="Адресаты"
                            leftIcon={<AddresseeIcon />}
                        />
                    )}
                    {hasAccessToProduct && (
                        <MenuItemLink
                            className={classes.styleMenuItem}
                            dense={dense}
                            to="/product"
                            primaryText="ServiceType"
                            leftIcon={<ProductIcon />}
                        />
                    )}
                    {hasAccessToSource && (
                        <MenuItemLink
                            className={classes.styleMenuItem}
                            dense={dense}
                            to="/source"
                            primaryText="Источники"
                            leftIcon={<SourceIcon />}
                        />
                    )}
                </MenuAccordion>
            </div>
        </Menu>
    );
};
