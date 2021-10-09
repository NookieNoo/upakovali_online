import * as React from 'react';
import { Admin, Resource } from 'react-admin';
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
    ParthnerIcon,
    ParthnerEdit,
    ParthnerShow,
    UserIcon,
    UserEdit,
    UserShow,
    UserCreate,
} from '@app-pages';
import authProvider from './authProvider';
import { dataProvider } from '@app-providers';

const App = () => (
    <Admin disableTelemetry dataProvider={dataProvider} dashboard={Dashboard} authProvider={authProvider}>
        <Resource name="client" list={ClientList} edit={ClientEdit} icon={ClientIcon} show={ClientShow} create={ClientCreate} />
        <Resource name="parthner" list={ParthnerList} icon={ParthnerIcon} edit={ParthnerEdit} show={ParthnerShow} />
        <Resource name="order" list={OrderList} edit={OrderEdit} icon={OrderIcon} show={OrderShow} />
        <Resource name="user" list={UserList} icon={UserIcon} edit={UserEdit} show={UserShow} create={UserCreate} />
    </Admin>
);

export default App;
