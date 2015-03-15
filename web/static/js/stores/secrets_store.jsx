var Dispatcher = require('../dispatcher/dispatcher.js');
var constants = require('../constants/constants.js');

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _secrets = [];
var _errors = [];

var SecretsStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllSecrets: function() {
    return _secrets;
  },

  getErrors: function() {
    return _errors;
  }

});

SecretsStore.dispatchToken = Dispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_SECRETS:
      _secrets = action.json.secrets;
      SecretsStore.emitChange();
      break;
  }


  return true;
});

module.exports = SecretsStore;
