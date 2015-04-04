import {Store} from 'flummox';
import Immutable from 'immutable';

import WebApiUtils from '../../utils/web_api_utils.js';

class SecretStore extends Store {
  constructor(flux) {
    super();

    const ServerActions = flux.getActionIds('ServerActions');
    this.register(ServerActions.receiveSecrets, this.receiveSecrets);

    this.state = {
      secrets: Immutable.List(),
      errors: Immutable.Map()
    };
  }

  getAllSecrets() {
    return this.state.secrets;
  }

  getErrors() {
    return this.state.errors;
  }

  receiveSecrets(response) {
    this.setState({secrets: response.json.secrets});
  }

}

export default SecretStore;
