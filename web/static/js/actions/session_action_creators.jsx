var Dispatcher = require('../dispatcher/dispatcher.js');
var Constants = require('../constants/constants.js');
var WebAPIUtils = require('../utils/web_api_utils.js');

var ActionTypes = Constants.ActionTypes;

module.exports = {

  signup: function(email, password, passwordConfirmation) {
    Dispatcher.handleViewAction({
      type: ActionTypes.SIGNUP_REQUEST,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
    });
    WebAPIUtils.signup(email, password, passwordConfirmation);
  },

  login: function(email, password) {
    Dispatcher.handleViewAction({
      type: ActionTypes.LOGIN_REQUEST,
      email: email,
      password: password
    });
    WebAPIUtils.login(email, password);
  },

  confirm: function(userId, token) {
    Dispatcher.handleViewAction({
      type: ActionTypes.CONFIRMATION_REQUEST,
      userId: userId,
      token: token
    });
    WebAPIUtils.confirm(userId, token);
  },

  logout: function() {
    Dispatcher.handleViewAction({
      type: ActionTypes.LOGOUT
    });
  }

};
