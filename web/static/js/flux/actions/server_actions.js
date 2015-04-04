import {Actions} from 'flummox';

class ServerActions extends Actions {

  receiveLogin(json, errors) {
    return {
      json: json,
      errors: errors
    };
  }

  receiveSignup(json, errors) {
    return {
      json: json,
      errors: errors
    };
  }

  receiveConfirm(json, errors) {
    return {
      json: json,
      errors: errors
    };
  }

  receiveSecrets(json, errors) {
    return {
      json: json,
      errors: errors
    };
  }

  receiveForgotPassword(json, errors) {
    return {
      json: json,
      errors: errors
    };
  }

  receiveResetPassword(json, errors) {
    return {
      json: json,
      errors: errors
    };
  }

  receiveAccount(json, errors) {
    return {
      json: json,
      errors: errors
    };
  }

  receiveUpdateAccount(json, errors) {
    return {
      json: json,
      errors: errors
    };
  }
};

export default ServerActions;
