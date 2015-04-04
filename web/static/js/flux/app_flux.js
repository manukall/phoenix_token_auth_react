import {Flux} from 'flummox';
import AccountActions from './actions/account_actions.js';
import AccountStore from './stores/account_store.js';

import RouterActions from './actions/router_actions.js';
import RouterStore from './stores/router_store.js';
import SessionActions from './actions/session_actions.js';
import SessionsStore from './stores/session_store.js';
import SecretStore from './stores/secret_store.js';
import SecretActions from './actions/secret_actions.js';

import ServerActions from './actions/server_actions.js';

class AppFlux extends Flux {
  constructor() {
    super();

    this.createActions('ServerActions', ServerActions, this);
    this.createActions('AccountActions', AccountActions, this);
    this.createActions('RouterActions', RouterActions, this);
    this.createActions('SessionActions', SessionActions, this);
    this.createActions('SecretActions', SecretActions, this);

    this.createStore('AccountStore', AccountStore, this);
    this.createStore('RouterStore', RouterStore, this);
    this.createStore('SecretStore', SecretStore, this);
    this.createStore('SessionsStore', SessionsStore, this);
  }
}

export default AppFlux;
