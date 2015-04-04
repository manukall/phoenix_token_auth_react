import React from "react";
import Router from 'react-router';
import FluxComponent from 'flummox/component';

class Confirm extends React.Component {
  componentDidMount() {
    console.dir(this.context);
    var userId = this.context.router.getCurrentParams().userId;
    var token = this.context.router.getCurrentParams().token;

    this.props.flux.getActions("SessionActions").confirm(userId, token);
  }

  render() {
    return (
      <div>
        Confirming your account.
      </div>
    )
  }
}

Confirm.contextTypes = {
  router: React.PropTypes.func
};


class ConfirmWrapper extends React.Component {
  render() {
    return (
      <FluxComponent connectToStores={["SessionsStore"]}>
        <Confirm />
      </FluxComponent>
    );
  }
}


export default ConfirmWrapper;
