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
import authProvider from './authProvider';
import { dataProvider } from '@app-providers';

const history = createHistory();

const App = () => (
    <Admin
        history={history}
        disableTelemetry
        dataProvider={dataProvider}
        dashboard={Dashboard}
        authProvider={authProvider}
    >
        <Resource
            name="client"
            list={ClientList}
            edit={ClientEdit}
            icon={ClientIcon}
            show={ClientShow}
            create={ClientCreate}
        />
        <Resource
            name="parthner"
            list={ParthnerList}
            icon={ParthnerIcon}
            edit={ParthnerEdit}
            show={ParthnerShow}
            create={ParthnerCreate}
        />
        <Resource
            name="order"
            list={OrderList}
            edit={OrderEdit}
            icon={OrderIcon}
            show={OrderShow}
            create={OrderCreate}
        />
        <Resource name="user" list={UserList} icon={UserIcon} edit={UserEdit} show={UserShow} create={UserCreate} />
        <Resource name="source" />
        <Resource name="workshop" />
        <Resource name="addressee" />
    </Admin>
);

export default App;
