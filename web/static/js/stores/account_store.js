var Dispatcher = require('../dispatcher/dispatcher.js');
var constants = require('../constants/constants.js');
var WebApiUtils = require('../utils/web_api_utils.js');

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _account = null;
var _errors = {};

var AccountStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAccount: function() {
    if (_account == null) {
      _account = {};
      WebApiUtils.loadAccount();
    }
    return _account;
  },

  getErrors: function() {
    return _errors;
  }

});

AccountStore.dispatchToken = Dispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.ACCOUNT_RESPONSE:
      _account = action.json.account;
      AccountStore.emitChange();
      break;

    default:
  }

  return true;
});

module.exports = AccountStore;
