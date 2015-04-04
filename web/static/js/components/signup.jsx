import React from 'react';
import {Input} from 'react-bootstrap';
import FluxComponent from 'flummox/component';
import _compact from "lodash/array/compact";
import ErrorNotice from '../components/common/error_notice.jsx';

class Signup extends React.Component {
  constructor(props) {
    this.state = {
      validationErrors: {}
    }
  }

  _onSubmit(e) {
    e.preventDefault();
    this.setState({ validationErrors: {} });
    var email = this.refs.email.getValue();
    var password = this.refs.password.getValue();
    var passwordConfirmation = this.refs.passwordConfirmation.getValue();
    if (password !== passwordConfirmation) {
      this.setState({ validationErrors: {password_confirmation: 'Password and password confirmation should match'}});
    } else {
      this.props.flux.getActions("SessionActions").signup(email, password);
    }
  }

  _errorsOn(field) {
    var errors = _compact([this.state.validationErrors[field],
                           this.props.errors[field]])
    return errors.join(<br />);
  }

  render() {
    var errors = (this.props.errors.base) ? <ErrorNotice message={this.props.errors.base}/> : <div></div>;
    return (
      <div>
        {errors}

        <div className="row">
          <form className="form-signin" onSubmit={this._onSubmit.bind(this)}>
            <h2 className="form-signin-heading">Please sign up below</h2>

            <Input ref="email"
                   type="email"
                   id="inputEmail"
                   className="form-control"
                   placeholder="Email address"
                   bsStyle={this._errorsOn("email") ? "error" : null}
                   help={this._errorsOn("email")}
                   required
                   autofocus />

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

            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
          </form>
        </div>
      </div>
    );
  }
}

class SignupWrapper extends React.Component {
  render() {
    return (
      <FluxComponent connectToStores={["SessionsStore"]}>
        <Signup />
      </FluxComponent>
    );
  }
}


export default SignupWrapper;
