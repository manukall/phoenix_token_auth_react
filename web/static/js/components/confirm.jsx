var React = require('react');
var Router = require('react-router');

var SessionStore = require('../stores/session_store.jsx');
var SessionActionCreators = require('../actions/session_action_creators.jsx');

var Confirm = React.createClass({
  mixins: [ Router.State ],

  getInitialState: function() {
    return { errors: [] };
  },

  componentDidMount: function() {
    var userId = this.getParams().userId;
    var token = this.getParams().token;

    SessionStore.addChangeListener(this._onChange);
    SessionActionCreators.confirm(userId, token);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ errors: SessionStore.getErrors() });
  },

  render: function() {
    return (
      <div>
        Confirming your account.
      </div>
    );
  }
});

module.exports = Confirm;
