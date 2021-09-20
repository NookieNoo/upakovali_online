import * as React from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import Dashboard from "@app-pages/Dashboard";


const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
const App = () => (
    <Admin dataProvider={dataProvider} dashboard={Dashboard}>
        <Resource name="users" list={ListGuesser} />
    </Admin>
);

export default App;
