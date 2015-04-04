import React from 'react';
import {Input} from 'react-bootstrap';
import FluxComponent from "flummox/component";

import ErrorNotice from '../components/common/error_notice.jsx';

class Account extends React.Component {
  constructor(props) {
    this.state = {
      errors: {}
    };
  }

  _onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {} });
    var email = this.refs.email.getValue();
    var password = this.refs.password.getValue();
    var passwordConfirmation = this.refs.passwordConfirmation.getValue();
    if (password !== passwordConfirmation) {
      this.setState({ errors: {password_confirmation: 'Password and password confirmation should match'}});
    } else {
      this.props.flux.getActions("AccountActions").updateAccount(email, password);
    }
  }

  render() {
    var errors = (this.state.errors.base) ? <ErrorNotice message={this.state.errors.base}/> : <div></div>;
    return (
      <div>
        {errors}

        <div className="row">
          <form className="form-signin" onSubmit={this._onSubmit.bind(this)}>
            <h2 className="form-signin-heading">Update your account data below</h2>

            <Input ref="email"
                   type="email"
                   id="inputEmail"
                   className="form-control"
                   placeholder="Email address"
                   bsStyle={this.state.errors.email ? "error" : null}
                   help={this.state.errors.email}
                   key={this.props.account.email}
                   defaultValue={this.props.account.email}
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
}

class AccountWrapper extends React.Component {
  render() {
    return(
      <FluxComponent connectToStores={["AccountStore"]}
                     stateGetter={([accountStore]) => ({account: accountStore.getAccount()})}>
        <Account />
      </FluxComponent>
    )
  }
}


export default AccountWrapper;
