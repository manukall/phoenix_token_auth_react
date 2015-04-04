import React from 'react';
import {Link} from 'react-router';
import ErrorNotice from '../components/common/error_notice.jsx';

import FluxComponent from 'flummox/component';

class Login extends React.Component {
  _onSubmit(e) {
    e.preventDefault();
    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;

    this.props.flux.getActions("SessionActions").login(email, password);
  }

  render() {
    var errors = (this.props.errors.base) ? <ErrorNotice message={this.props.errors.base}/> : <div></div>;
    return (
      <div>
        {errors}

        <div className="row">
          <form className="form-signin" onSubmit={this._onSubmit.bind(this)}>
            <h2 className="form-signin-heading">Please log in below</h2>

            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input ref="email" type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />

            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input ref="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required />

            <button className="btn btn-lg btn-primary btn-block" type="submit">Log in</button>

            <div className="row">
              <Link to="forgot_password">Forgot password</Link>
            </div>

          </form>
        </div>
      </div>
    );
  }
}

class LoginWrapper extends React.Component {
  render() {
    return (
      <FluxComponent connectToStores={["SessionsStore"]}>
        <Login />
      </FluxComponent>
    );
  }
}

export default LoginWrapper;
