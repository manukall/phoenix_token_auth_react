var Dispatcher = require('../dispatcher/dispatcher.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var Constants = require('../constants/constants.js');
var ActionTypes = Constants.ActionTypes;

var Router = require('react-router');
var routes = require('../routes.jsx');

var SessionStore = require('../stores/session_store.jsx');

var router = Router.create({
  routes: routes,
  location: null // Router.HistoryLocation
});

var CHANGE_EVENT = 'change';

var RouteStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function() {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getRouter: function() {
    return router;
  },

  redirectHome: function() {
    router.transitionTo('app');
  }
});

RouteStore.dispatchToken = Dispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.REDIRECT:
      router.transitionTo(action.route);
      break;

    case ActionTypes.LOGIN_RESPONSE:
      if (SessionStore.isLoggedIn()) {
        router.transitionTo('app');
      }
      break;

    default:
  }

  return true;
});

module.exports = RouteStore;
