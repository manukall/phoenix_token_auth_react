var React = require('react');
var State = require('react-router').State;
var SessionStore = require('../stores/session_store.jsx');
var SessionActionCreators = require('../actions/session_action_creators.jsx');
var ErrorNotice = require('../components/common/error_notice.jsx');


var PasswordReset = React.createClass({
  mixins: [State],

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
    var userId = this.getParams().userId;
    var resetToken = this.getParams().resetToken;
    var password = this.refs.password.getDOMNode().value;
    var passwordConfirmation = this.refs.passwordConfirmation.getDOMNode().value;

    if (password === passwordConfirmation) {
      SessionActionCreators.resetPassword(userId, resetToken, password);
    } else {
      this.setState({ errors: ['Password and password confirmation should match']});
    }
  },

  render: function() {
    var errors = (Object.keys(this.state.errors).length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;

    return (
      <div>
        {errors}

        <div className="row">
          <form className="form-signin" onSubmit={this._onSubmit}>
            <h2 className="form-signin-heading">Please choose a new password</h2>

            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input ref="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required />

            <label htmlFor="inputPasswordConfirmation" className="sr-only">Password confirmation</label>
            <input ref="passwordConfirmation" type="password" id="inputPasswordConfirmation" className="form-control" placeholder="Password confirmation" required />

            <button className="btn btn-lg btn-primary btn-block" type="submit">Set new password</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = PasswordReset;
