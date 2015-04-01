var React = require('react');
var Input = require('react-bootstrap').Input;

var AccountStore = require('../stores/account_store.js');
var AccountActionCreators = require('../actions/account_action_creators.js');
var ErrorNotice = require('../components/common/error_notice.jsx');

var Account = React.createClass({
  getInitialState: function() {
    return {
      errors: {},
      account: AccountStore.getAccount()
    };
  },

  componentDidMount: function() {
    AccountStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AccountStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      errors: AccountStore.getErrors(),
      account: AccountStore.getAccount()
    });
  },

  _onSubmit: function(e) {
    e.preventDefault();
    this.setState({ errors: {} });
    var email = this.refs.email.getValue();
    var password = this.refs.password.getValue();
    var passwordConfirmation = this.refs.passwordConfirmation.getValue();
    if (password !== passwordConfirmation) {
      this.setState({ errors: {password_confirmation: 'Password and password confirmation should match'}});
    } else {
      AccountActionCreators.updateAccount(email, password);
    }
  },

  render: function() {
    var errors = (this.state.errors.base) ? <ErrorNotice message={this.state.errors.base}/> : <div></div>;
    return (
      <div>
        {errors}

        <div className="row">
          <form className="form-signin" onSubmit={this._onSubmit}>
            <h2 className="form-signin-heading">Update your account data below</h2>

            <Input ref="email"
                   type="email"
                   id="inputEmail"
                   className="form-control"
                   placeholder="Email address"
                   bsStyle={this.state.errors.email ? "error" : null}
                   help={this.state.errors.email}
                   key={this.state.account.email}
                   defaultValue={this.state.account.email}
                   autofocus />

            <Input ref="password"
                   type="password"
                   id="inputPassword"
                   className="form-control"
                   placeholder="Password"
                   bsStyle={this.state.errors.password ? "error" : null}
                   help={this.state.errors.password} />

            <Input ref="passwordConfirmation"
                   type="password"
                   id="inputPasswordConfirmation"
                   className="form-control"
                   placeholder="Password confirmation"
                   bsStyle={this.state.errors.password_confirmation ? "error" : null}
                   help={this.state.errors.password_confirmation} />

            <button className="btn btn-lg btn-primary btn-block" type="submit">Save</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = Account;
