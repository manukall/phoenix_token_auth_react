import React from 'react';
import FluxComponent from "flummox/component";
import ErrorNotice from '../components/common/error_notice.jsx';


class ForgotPasswort extends React.Component {
  _onSubmit(e) {
    e.preventDefault();
    var email = this.refs.email.getDOMNode().value;

    this.props.flux.getActions("SessionActions").forgotPassword(email);
  }

  render() {
    var errors = (this.props.errors.size > 0) ? <ErrorNotice errors={this.props.errors}/> : <div></div>;

    return (
      <div>
        {errors}

        <div className="row">
          <form className="form-signin" onSubmit={this._onSubmit.bind(this)}>
            <h2 className="form-signin-heading">Please enter your email below</h2>

            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input ref="email" type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />

            <button className="btn btn-lg btn-primary btn-block" type="submit">Send password reset instructions</button>
          </form>
        </div>
      </div>
    );
  }
}

class ForgotPasswortWrapper extends React.Component {
  render() {
    return (
      <FluxComponent connectToStores={["SessionsStore"]}>
        <ForgotPasswort />
      </FluxComponent>
    );
  }
}

export default ForgotPasswortWrapper;
