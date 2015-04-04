import {Store} from 'flummox';
import Immutable from 'immutable';

import WebApiUtils from '../../utils/web_api_utils.js';


class AccountStore extends Store {
  constructor(flux) {
    super();

    this.flux = flux;
    this.accountLoaded = false;

    const ServerActions = flux.getActionIds('ServerActions');
    this.register(ServerActions.receiveAccount, this.receiveAccount);

    this.state = {
      account: Immutable.Map(),
      errors: Immutable.Map()
    };
  }

  getAccount() {
    if (!this.accountLoaded) {
      this.accountLoaded = true;
      WebApiUtils.loadAccount(this.flux);
    }
    return this.state.account;
  }

  getErrors() {
    return this.state.errors;
  }

  receiveAccount(response) {
    this.setState({account: response.json.account});
  }
}

export default AccountStore;
