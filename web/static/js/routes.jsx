var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./components/app.jsx');
var Hello = require('./components/hello.jsx');
var Signup = require('./components/signup.jsx');

module.exports = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={Hello} />
    <Route name="signup" path="/signup" handler={Signup}/>
  </Route>
);
