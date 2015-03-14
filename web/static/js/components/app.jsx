var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

var Header = require('./header.jsx');

var App = React.createClass({
  render: function() {
    return (
      <div className="container-fluid">
        <Header />
        <RouteHandler/>
      </div>
    );
  }
});

module.exports = App;
