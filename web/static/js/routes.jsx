var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./components/app.jsx');
var SecretsList = require('./components/secrets_list.jsx');
var Signup = require('./components/signup.jsx');
var Login = require('./components/login.jsx');
var ForgotPasswort = require('./components/forgot_password.jsx');
var PasswordReset = require('./components/password_reset.jsx');
var Confirm = require('./components/confirm.jsx');
var Account = require('./components/account.jsx');

module.exports = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={SecretsList} />
    <Route name="signup" path="/signup" handler={Signup}/>
    <Route name="login" path="/login" handler={Login}/>
    <Route name="confirm" path="/users/:userId/confirm/:token" handler={Confirm}/>
    <Route name="forgot_password" path="/forgot_password" handler={ForgotPasswort}/>
    <Route name="password_reset" path="/users/:userId/reset_password/:resetToken" handler={PasswordReset}/>
    <Route name="account" path="/account" handler={Account}/>
  </Route>
);
