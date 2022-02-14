import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import { createBrowserHistory as createHistory } from 'history';
import {
    Dashboard,
    ClientList,
    ParthnerList,
    OrderList,
    UserList,
    ClientEdit,
    ClientShow,
    ClientCreate,
    OrderEdit,
    OrderShow,
    OrderCreate,
    ParthnerEdit,
    ParthnerShow,
    ParthnerCreate,
    UserEdit,
    UserShow,
    UserCreate,
    PriceList,
    PriceShow,
    PriceEdit,
    PriceCreate,
    WorkshopList,
    AddresseeList,
    ProductList,
    SourceList,
} from '@app-pages';
import { dataProvider, i18nProvider, authProvider } from '@app-providers';
import { ResourceWithPermissions, CustomLayout } from '@app-components/overriding';
import { customRoutes } from 'routes/customRoutes';
import { LoginPage } from '@app-pages';

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
        layout={CustomLayout}
        title="upakovali.online"
        customRoutes={customRoutes}
        loginPage={LoginPage}
    >
        <ResourceWithPermissions
            name="client"
            list={ClientList}
            edit={ClientEdit}
            show={ClientShow}
            create={ClientCreate}
            options={options.client}
        />
        <ResourceWithPermissions
            name="parthner"
            list={ParthnerList}
            edit={ParthnerEdit}
            show={ParthnerShow}
            create={ParthnerCreate}
            options={options.parthner}
        />
        <ResourceWithPermissions
            name="order"
            list={OrderList}
            edit={OrderEdit}
            show={OrderShow}
            create={OrderCreate}
            options={options.order}
        />
        <ResourceWithPermissions
            name="user"
            list={UserList}
            edit={UserEdit}
            show={UserShow}
            create={UserCreate}
            options={options.user}
        />
        <ResourceWithPermissions name="price" list={PriceList} show={PriceShow} edit={PriceEdit} create={PriceCreate} />
        <ResourceWithPermissions name="workshop" list={WorkshopList} />
        <ResourceWithPermissions name="source" list={SourceList} />
        <ResourceWithPermissions name="addressee" list={AddresseeList} />
        <Resource name="role" />
        <Resource name="order_status" />
        <Resource name="service" />
        <Resource name="activity" />
        <ResourceWithPermissions name="product" list={ProductList} />
    </Admin>
);

export default App;
