import * as React from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { Dashboard, ClientList, ParthnerList, OrderList, UserList } from "@app-pages";
import authProvider from "./authProvider";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
const App = () => (
    <Admin
        dataProvider={dataProvider}
        dashboard={Dashboard}
        authProvider={authProvider}
    >
        <Resource name="clients" list={ClientList} />
        <Resource name="parthners" list={ParthnerList} />
        <Resource name="orders" list={OrderList} />
        <Resource name="users" list={ListGuesser} />
    </Admin>
);

export default App;
