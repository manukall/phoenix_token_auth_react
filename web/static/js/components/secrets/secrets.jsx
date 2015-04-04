import React from 'react';
import FluxComponent from 'flummox/component';

import SecretsList from './secrets_list.jsx';

class Secrets extends React.Component {
  render() {
    return (
      <FluxComponent connectToStores={{
        SecretStore: store => ({secrets: store.getAllSecrets()}),
        SessionsStore: store => ({isLoggedIn: store.isLoggedIn()})
      }}>
        <SecretsList />
      </FluxComponent>
    );
  }
}

export default Secrets
