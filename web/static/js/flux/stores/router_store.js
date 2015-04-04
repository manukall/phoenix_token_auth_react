import Router from 'react-router';
import {Store} from 'flummox';
import Immutable from 'immutable';

import routes from '../../routes.jsx';

class RouterStore extends Store {
  constructor(flux) {
    super();

    const RouterActions = flux.getActionIds('RouterActions');
    this.register(RouterActions.redirect, this.redirect);

    const SessionActions = flux.getActionIds('SessionActions');
    this.register(SessionActions.logout, this.redirectToLogin);

    const ServerActions = flux.getActionIds('ServerActions');
    this.register(ServerActions.receiveLogin, this.redirectToSecrets);
    this.register(ServerActions.receiveConfirm, this.redirectToSecrets);
    this.register(ServerActions.receiveSignup, this.redirectToLogin);

    this.state = {
      router: Router.create({
        routes: routes,
        location: null // Router.HistoryLocation
      })
    };
  }

  getRouter() {
    return this.state.router;
  }

  redirectToSecrets(data) {
    if (!data.errors) {
      this.state.router.transitionTo('secrets');
    }
  }

  redirectToLogin(data) {
    if (!data.errors) {
      this.state.router.transitionTo('login');
    }
  }

  redirect(route) {
    this.state.router.transitionTo(route);
  }
}

export default RouterStore;
