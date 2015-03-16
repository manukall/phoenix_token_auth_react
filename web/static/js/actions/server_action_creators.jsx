var Dispatcher = require('../dispatcher/dispatcher.js');
var Constants = require('../constants/constants.js');

var ActionTypes = Constants.ActionTypes;

module.exports = {

  receiveLogin: function(json, errors) {
    Dispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveSignup: function(json, errors) {
    Dispatcher.handleServerAction({
      type: ActionTypes.SIGNUP_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveConfirm: function(json, errors) {
    Dispatcher.handleServerAction({
      type: ActionTypes.CONFIRM_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveSecrets: function(json, errors) {
    Dispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_SECRETS,
      json: json,
      errors: errors
    });
  },

  receiveForgotPassword: function(json, errors) {
    Dispatcher.handleServerAction({
      type: ActionTypes.FORGOT_PASSWORD_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveResetPassword: function(json, errors) {
    Dispatcher.handleServerAction({
      type: ActionTypes.RESET_PASSWORD_RESPONSE,
      json: json,
      errors: errors
    });
  },
};
