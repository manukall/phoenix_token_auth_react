var React = require('react');

var SessionStore = require('../stores/session_store.jsx');
var SecretsStore = require('../stores/secrets_store.jsx');
var RouteActionCreators = require('../actions/route_action_creators.jsx');
var SecretActionCreators = require('../actions/secret_action_creators.jsx');

var SecretsList = React.createClass({
  getInitialState: function() {
    return {
      secrets: SecretsStore.getAllSecrets(),
      errors: []
    };
  },

  componentDidMount: function() {
    if (!SessionStore.isLoggedIn()) {
      RouteActionCreators.redirect('login');
    } else {
      SecretsStore.addChangeListener(this._onChange);
      SecretActionCreators.loadSecrets();
    }
  },

  componentWillUnmount: function() {
    SecretsStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      secrets: SecretsStore.getAllSecrets(),
      errors: SecretsStore.getErrors()
    });
  },

  render: function() {
    return (
      <div className="row">
        {this.state.secrets.map(function(secret, index){
          return (
            <div className="panel panel-default">
              <div className="panel-body" key={"secret-" + index}>{secret.text}</div>
            </div>
            )
        })}
      </div>
    );
  }
});

module.exports = SecretsList;
