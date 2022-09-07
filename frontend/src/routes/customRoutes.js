// in src/customRoutes.js
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteWithoutLayout } from 'react-admin';
import { Analytics, PasswordRestore, NewPassword, VerifyEmail } from '@app-pages';
import AuthContainer from 'components/pages/Auth/AuthContainer';

const customRoutes = [
    <Route exact path="/analytics" component={Analytics} />,
    <RouteWithoutLayout exact path="/auth/*" component={AuthContainer} />,
    // <RouteWithoutLayout exact path="/email/verify" component={PasswordRestore} />,
    <RouteWithoutLayout exact path="/verify-email" component={VerifyEmail} />,
    <RouteWithoutLayout
        exact
        path="/new-password"
        render={(routeProps) => {
            const url = new URL(window.location.href);
            const email = url.searchParams.get('email');
            const token = url.searchParams.get('token');
            console.log(email, token);
            if (!email || !token) return <Redirect to="/login" />;
            return <NewPassword {...routeProps} />;
        }}
    />,
];

export { customRoutes };
