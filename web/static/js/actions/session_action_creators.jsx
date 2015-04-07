var Dispatcher = require('../dispatcher/dispatcher.js');
var Constants = require('../constants/constants.js');
var WebAPIUtils = require('../utils/web_api_utils.js');

var ActionTypes = Constants.ActionTypes;

module.exports = {

  signup: function(email, password) {
    Dispatcher.handleViewAction({
      type: ActionTypes.SIGNUP_REQUEST,
      email: email,
      password: password
    });
    WebAPIUtils.signup(email, password);
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

  forgotPassword: function(email) {
    Dispatcher.handleViewAction({
      type: ActionTypes.FORGOT_PASSWORD_REQUEST,
      email: email
    });
    WebAPIUtils.forgotPassword(email);
  },

  resetPassword: function(userId, resetToken, password) {
    Dispatcher.handleViewAction({
      type: ActionTypes.SIGNUP_REQUEST,
      userId: userId,
      resetToken: resetToken,
      password: password
    });
    WebAPIUtils.resetPassword(userId, resetToken, password);
  },

  logout: function() {
    Dispatcher.handleViewAction({
      type: ActionTypes.LOGOUT
    });
  }

};
