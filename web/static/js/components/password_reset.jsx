import React from 'react';
import {Input} from 'react-bootstrap';
import {State} from 'react-router';
import FluxComponent from 'flummox/component';
import _compact from "lodash/array/compact";

import ErrorNotice from '../components/common/error_notice.jsx';


class PasswordReset extends React.Component {
  constructor(props) {
    this.state = {
      validationErrors: {}
    };
  }

  _errorsOn(field) {
    var errors = _compact([this.state.validationErrors[field],
                           this.props.errors[field]])
    return errors.join(<br />);
  }

  _onSubmit(e) {
    e.preventDefault();
    this.setState({ validationErrors: {} });
    var userId = this.context.router.getCurrentParams().userId;
    var resetToken = this.context.router.getCurrentParams().resetToken;
    var password = this.refs.password.getValue();
    var passwordConfirmation = this.refs.passwordConfirmation.getValue();

    if (password === passwordConfirmation) {
      this.props.flux.getActions("SessionActions").resetPassword(userId, resetToken, password);
    } else {
      this.setState({ validationErrors: {password_confirmation: 'Password and password confirmation should match'}});
    }
  }

  render() {
    var errors = (this.props.errors.base) ? <ErrorNotice message={this.props.errors.base}/> : <div></div>;

    return (
      <div>
        {errors}

        <div className="row">
          <form className="form-signin" onSubmit={this._onSubmit.bind(this)}>
            <h2 className="form-signin-heading">Please choose a new password</h2>

            <Input ref="password"
                   type="password"
                   id="inputPassword"
                   className="form-control"
                   placeholder="Password"
                   bsStyle={this._errorsOn("password") ? "error" : null}
                   help={this._errorsOn("password")}
                   required />

            <Input ref="passwordConfirmation"
                   type="password"
                   id="inputPasswordConfirmation"
                   className="form-control"
                   placeholder="Password confirmation"
                   bsStyle={this._errorsOn("password_confirmation") ? "error" : null}
                   help={this._errorsOn("password_confirmation")}
                   required />

            <button className="btn btn-lg btn-primary btn-block" type="submit">Set new password</button>
          </form>
        </div>
      </div>
    );
  }
}

PasswordReset.contextTypes = {
  router: React.PropTypes.func
};

class PasswordResetWrapper extends React.Component {
  render() {
    return (
      <FluxComponent connectToStores={["SessionsStore"]}>
        <PasswordReset />
      </FluxComponent>
    );
  }
}

export default PasswordResetWrapper;
