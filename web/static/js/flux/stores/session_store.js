import {Store} from 'flummox';
import Immutable from 'immutable';

class SessionStore extends Store {
  constructor(flux) {
    super();

    const SessionActions = flux.getActionIds('SessionActions');
    const ServerActions = flux.getActionIds('ServerActions');
    this.register(ServerActions.receiveLogin, this.login);
    this.register(ServerActions.receiveConfirm, this.login);
    this.register(ServerActions.receiveResetPassword, this.login);
    this.register(ServerActions.receiveForgotPassword, this.setErrors);
    this.register(ServerActions.receiveSignup, this.setErrors);
    this.register(SessionActions.logout, this.logout);

    this.state = {
      accessToken: sessionStorage.getItem('accessToken'),
      errors: Immutable.Map()
    };
  }

  isLoggedIn() {
    return(this.state.accessToken ? true : false);
  }

  getAccessToken() {
    return this.state.accessToken;
  }

  getErrors() {
    return this.state.errors;
  }

  login(response) {
    if(response.json) {
      this.setState({accessToken: response.json.token, errors: Immutable.Map()});
      sessionStorage.setItem('accessToken', response.json.token);
    } else {
      this.setState({accessToken: null, errors: response.errors || Immutable.Map()});
    }
  }

  logout() {
    this.setState({accessToken: null});
    sessionStorage.removeItem('accessToken');
  }

  setErrors(response) {
    this.setState({errors: response.errors || Immutable.Map()});
  }
}

export default SessionStore;
