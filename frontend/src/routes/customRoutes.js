// in src/customRoutes.js
import * as React from 'react';
import { Route } from 'react-router-dom';
import { Analytics, Handbooks } from '@app-pages';


const customRoutes = [
    <Route exact path="/analytics" component={Analytics} />,
    <Route exact path="/handbooks" component={Handbooks} />,
];

export { customRoutes };
