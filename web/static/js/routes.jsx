import React from 'react';
import {Route, DefaultRoute} from 'react-router';

import App from './components/app.jsx';
import Secrets from './components/secrets/secrets.jsx';
import Signup from './components/signup.jsx';
import Login from './components/login.jsx';
import ForgotPasswort from './components/forgot_password.jsx';
import PasswordReset from './components/password_reset.jsx';
import Confirm from './components/confirm.jsx';
import Account from './components/account.jsx';

export default (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="secrets" handler={Secrets} />
    <Route name="signup" path="/signup" handler={Signup}/>
    <Route name="login" path="/login" handler={Login}/>
    <Route name="confirm" path="/users/:userId/confirm/:token" handler={Confirm}/>
    <Route name="forgot_password" path="/forgot_password" handler={ForgotPasswort}/>
    <Route name="password_reset" path="/users/:userId/reset_password/:resetToken" handler={PasswordReset}/>
    <Route name="account" path="/account" handler={Account}/>
  </Route>
);
