var React = require('react');
var Input = require('react-bootstrap').Input;

var SessionStore = require('../stores/session_store.jsx');
var SessionActionCreators = require('../actions/session_action_creators.jsx');
var ErrorNotice = require('../components/common/error_notice.jsx');

var Signup = React.createClass({
  getInitialState: function() {
    return { errors: {} };
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
    var email = this.refs.email.getValue();
    var password = this.refs.password.getValue();
    var passwordConfirmation = this.refs.passwordConfirmation.getValue();
    if (password !== passwordConfirmation) {
      this.setState({ errors: {password_confirmation: 'Password and password confirmation should match'}});
    } else {
      SessionActionCreators.signup(email, password);
    }
  },

  render: function() {
    var errors = (this.state.errors.base) ? <ErrorNotice message={this.state.errors.base}/> : <div></div>;
    return (
      <div>
        {errors}

        <div className="row">
          <form className="form-signin" onSubmit={this._onSubmit}>
            <h2 className="form-signin-heading">Please sign up below</h2>

            <Input ref="email"
                   type="email"
                   id="inputEmail"
                   className="form-control"
                   placeholder="Email address"
                   bsStyle={this.state.errors.email ? "error" : null}
                   help={this.state.errors.email}
                   required
                   autofocus />

            <Input ref="password"
                   type="password"
                   id="inputPassword"
                   className="form-control"
                   placeholder="Password"
                   bsStyle={this.state.errors.password ? "error" : null}
                   help={this.state.errors.password}
                   required />

            <Input ref="passwordConfirmation"
                   type="password"
                   id="inputPasswordConfirmation"
                   className="form-control"
                   placeholder="Password confirmation"
                   bsStyle={this.state.errors.password_confirmation ? "error" : null}
                   help={this.state.errors.password_confirmation}
                   required />

            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = Signup;
