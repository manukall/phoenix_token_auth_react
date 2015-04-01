var Dispatcher = require('../dispatcher/dispatcher.js');
var constants = require('../constants/constants.js');

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = constants.ActionTypes;
var CHANGE_EVENT = 'change';

// Load an access token from the session storage, you might want to implement
// a 'remember me' using localSgorage
var _accessToken = sessionStorage.getItem('accessToken');
var _errors = {};

var SessionStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isLoggedIn: function() {
    return _accessToken ? true : false;
  },

  getAccessToken: function() {
    return _accessToken;
  },

  getErrors: function() {
    return _errors;
  }

});

SessionStore.dispatchToken = Dispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.LOGIN_RESPONSE:
    case ActionTypes.CONFIRM_RESPONSE:
    case ActionTypes.RESET_PASSWORD_RESPONSE:
      if (action.json && action.json.token) {
        _accessToken = action.json.token;
        // Token will always live in the session, so that the API can grab it with no hassle
        sessionStorage.setItem('accessToken', _accessToken);
      }
      _errors = action.errors || {};
      SessionStore.emitChange();
      break;

    case ActionTypes.FORGOT_PASSWORD_RESPONSE:
      _errors = action.errors || {};
      SessionStore.emitChange();
      break;

    case ActionTypes.SIGNUP_RESPONSE:
      _errors = action.errors || {};
      SessionStore.emitChange();
      break;

    case ActionTypes.LOGOUT:
      _accessToken = null;
      sessionStorage.removeItem('accessToken');
      SessionStore.emitChange();
      break;

    default:
  }

  return true;
});

module.exports = SessionStore;
