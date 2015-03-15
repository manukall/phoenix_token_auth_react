var React = require('react');

var SessionStore = require('../stores/session_store.jsx');
var RouteActionCreators = require('../actions/route_action_creators.jsx');

var Hello = React.createClass({
  componentDidMount: function() {
    if (!SessionStore.isLoggedIn()) {
      RouteActionCreators.redirect('login');
    }
  },

  render: function() {
    return (
      <div>
        Hello
      </div>
    );
  }
});

module.exports = Hello;
