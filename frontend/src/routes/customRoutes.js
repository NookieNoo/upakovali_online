// in src/customRoutes.js
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteWithoutLayout } from 'react-admin';
import { Analytics, ForgotPassword, PasswordRestore, RegistrationPage, NewPassword, VerifyEmail } from '@app-pages';

const customRoutes = [
    <Route exact path="/analytics" component={Analytics} />,
    <RouteWithoutLayout exact path="/registration" component={RegistrationPage} />,
    <RouteWithoutLayout exact path="/forgot-password" component={ForgotPassword} />,
    <RouteWithoutLayout exact path="/password-restore" component={PasswordRestore} />,
    <RouteWithoutLayout exact path="/email/verify" component={PasswordRestore} />,
    <RouteWithoutLayout exact path="/verify-email/:user_id/:hash" component={VerifyEmail} />,
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
