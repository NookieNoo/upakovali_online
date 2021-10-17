import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import { ResourceWithPermission } from 'ra-access-control-lists';
import { createBrowserHistory as createHistory } from 'history';
import {
    Dashboard,
    ClientList,
    ParthnerList,
    OrderList,
    UserList,
    ClientEdit,
    ClientIcon,
    ClientShow,
    ClientCreate,
    OrderEdit,
    OrderIcon,
    OrderShow,
    OrderCreate,
    ParthnerIcon,
    ParthnerEdit,
    ParthnerShow,
    ParthnerCreate,
    UserIcon,
    UserEdit,
    UserShow,
    UserCreate,
} from '@app-pages';
import { dataProvider, i18nProvider, authProvider } from '@app-providers';

const history = createHistory();
const options = {
    client: {
        label: 'Клиенты',
    },
    parthner: {
        label: 'Партнеры',
    },
    order: {
        label: 'Заказы',
    },
    user: {
        label: 'Пользователи',
    },
};

const App = () => (
    <Admin
        history={history}
        disableTelemetry
        dataProvider={dataProvider}
        dashboard={Dashboard}
        authProvider={authProvider}
        i18nProvider={i18nProvider}
    >
        <ResourceWithPermission
            name="client"
            list={ClientList}
            edit={ClientEdit}
            icon={ClientIcon}
            show={ClientShow}
            create={ClientCreate}
            options={options.client}
        />
        <ResourceWithPermission
            name="parthner"
            list={ParthnerList}
            icon={ParthnerIcon}
            edit={ParthnerEdit}
            show={ParthnerShow}
            create={ParthnerCreate}
            options={options.parthner}
        />
        <ResourceWithPermission
            name="order"
            list={OrderList}
            edit={OrderEdit}
            icon={OrderIcon}
            show={OrderShow}
            create={OrderCreate}
            options={options.order}
        />
        <ResourceWithPermission
            name="user"
            list={UserList}
            icon={UserIcon}
            edit={UserEdit}
            show={UserShow}
            create={UserCreate}
            options={options.user}
        />
        <Resource name="source" />
        <Resource name="workshop" />
        <Resource name="addressee" />
        <Resource name="role" />
        <Resource name="order_status" />
    </Admin>
);

export default App;
