import React from 'react';
import { Route,Switch } from 'react-router';
import { RegistrationPage } from './Registration';
import { PasswordRestore } from './PasswordRestore';
import { ForgotPassword } from './ForgotPassword';

const AuthContainer = () => {
    return (
        <Switch>
            <Route exact path='/auth/registration' >
                <RegistrationPage />
            </Route>
            <Route exact path='/auth/password-restore'>
                <PasswordRestore />
            </Route>
            <Route exact path='/auth/forgot-password'>
                <ForgotPassword />
            </Route>
        </Switch>
    );
};

export default AuthContainer;