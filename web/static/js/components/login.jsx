var React = require('react');
var SessionStore = require('../stores/session_store.jsx');
var SessionActionCreators = require('../actions/session_action_creators.jsx');
var ErrorNotice = require('../components/common/error_notice.jsx');

var Login = React.createClass({
  getInitialState: function() {
    return { errors: [] };
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ errors: SessionStore.getErrors() });
  },

  _onSubmit: function(e) {
    e.preventDefault();
    this.setState({ errors: [] });
    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;

    SessionActionCreators.login(email, password);
  },

  render: function() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    return (
      <div>
        {errors}

        <div className="row">
          <form className="form-signin" onSubmit={this._onSubmit}>
            <h2 className="form-signin-heading">Please log in below</h2>

            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input ref="email" type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />

            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input ref="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required />

            <button className="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = Login;
