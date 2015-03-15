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
};
