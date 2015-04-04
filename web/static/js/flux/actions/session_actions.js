import {Actions} from 'flummox';
import WebAPIUtils from '../../utils/web_api_utils.js';


class SessionActions extends Actions {
  constructor(flux) {
    super();
    this.flux = flux;
  }

  signup(email, password) {
    WebAPIUtils.signup(this.flux, email, password);
    return {
      email: email,
      password: password
    };
  }

  login(email, password) {
    WebAPIUtils.login(this.flux, email, password);
    return {
      email: email,
      password: password
    };
  }

  confirm(userId, token) {
    WebAPIUtils.confirm(this.flux, userId, token);
    return {
      userId: userId,
      token: token
    };
  }

  forgotPassword(email) {
    WebAPIUtils.forgotPassword(this.flux, email);
    return {
      email: email
    };
  }

  resetPassword(userId, resetToken, password) {
    WebAPIUtils.resetPassword(this.flux, userId, resetToken, password);
    return {
      userId: userId,
      resetToken: resetToken,
      password: password
    };
  }

  logout() {
    return true;
  }

}

export default SessionActions;
