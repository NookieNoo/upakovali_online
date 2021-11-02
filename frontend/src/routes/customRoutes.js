// in src/customRoutes.js
import * as React from 'react';
import { Route } from 'react-router-dom';
import { Analytics } from '@app-pages';

const customRoutes = [<Route exact path="/analytics" component={Analytics} />];

export { customRoutes };
