var dispatcher = require('../dispatcher/dispatcher.js');

var constants = require('../constants/constants.js');

var ActionTypes = constants.ActionTypes;

module.exports = {
  redirect: function(route) {
    dispatcher.handleViewAction({
      type: ActionTypes.REDIRECT,
      route: route
    });
  }
};
