var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./components/app.jsx');
var SecretsList = require('./components/secrets_list.jsx');
var Signup = require('./components/signup.jsx');
var Login = require('./components/login.jsx');
var Confirm = require('./components/confirm.jsx');

module.exports = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={SecretsList} />
    <Route name="signup" path="/signup" handler={Signup}/>
    <Route name="login" path="/login" handler={Login}/>
    <Route name="confirm" path="/users/:userId/confirm/:token" handler={Confirm}/>
  </Route>
);
