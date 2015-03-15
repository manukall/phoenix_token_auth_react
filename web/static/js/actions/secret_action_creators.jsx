var Dispatcher = require('../dispatcher/dispatcher.js');
var Constants = require('../constants/constants.js');
var WebAPIUtils = require('../utils/web_api_utils.js');

var ActionTypes = Constants.ActionTypes;

module.exports = {

  loadSecrets: function() {
    Dispatcher.handleViewAction({
      type: ActionTypes.LOAD_SECRETS,
    });
    WebAPIUtils.loadSecrets();
  },

};
