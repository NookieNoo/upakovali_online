import * as React from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import { Dashboard, ClientList, ParthnerList, OrderList, UserList } from "@app-pages";
import authProvider from "./authProvider";
import { dataProvider } from "@app-providers";

const App = () => (
    <Admin
        dataProvider={dataProvider}
        dashboard={Dashboard}
        authProvider={authProvider}
    >
        <Resource name="client" list={ClientList} />
        <Resource name="parthners" list={ParthnerList} />
        <Resource name="orders" list={OrderList} />
        <Resource name="users" list={ListGuesser} />
    </Admin>
);

export default App;
