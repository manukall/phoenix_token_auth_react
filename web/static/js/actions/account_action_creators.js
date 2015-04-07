var Dispatcher = require('../dispatcher/dispatcher.js');
var Constants = require('../constants/constants.js');
var WebAPIUtils = require('../utils/web_api_utils.js');

var ActionTypes = Constants.ActionTypes;

module.exports = {

  updateAccount: function(email, password) {
    Dispatcher.handleViewAction({
      type: ActionTypes.UPDATE_ACCOUNT_REQUEST,
      email: email,
      password: password
    });
    WebAPIUtils.updateAccount(email, password);
  }


};
