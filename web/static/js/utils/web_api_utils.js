var ServerActionCreators = require('../actions/server_action_creators.jsx');
var constants = require('../constants/constants.js');
var request = require('superagent');

function _getErrors(res) {
  var errorMsgs = ["Something went wrong, please try again"];
  var json = JSON.parse(res.text);
  if ((json)) {
    if (json['errors']) {
      errorMsgs = json['errors'];
    } else if (json['error']) {
      errorMsgs = json['error'];
    }
  }
  return errorMsgs;
}

var APIEndpoints = constants.APIEndpoints;

module.exports = {

  signup: function(email, password) {
    request.post(APIEndpoints.REGISTRATION)
      .send({ user: {
        email: email,
        password: password
      }})
      .set('Accept', 'application/json')
      .end(function(error, res) {
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveSignup(null, errorMsgs);
          } else {
            var json = JSON.parse(res.text);
            ServerActionCreators.receiveSignup(json, null);
          }
        }
      });
  },

  confirm: function(userId, token) {
    request.post(APIEndpoints.CONFIRM.replace("%{userId}", userId))
      .send({ confirmation_token: token })
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveConfirm(null, errorMsgs);
          } else {
            var json = JSON.parse(res.text);
            ServerActionCreators.receiveConfirm(json, null);
          }
        }
      });
  },

  login: function(email, password) {
    request.post(APIEndpoints.LOGIN)
      .send({ email: email, password: password })
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveLogin(null, errorMsgs);
          } else {
            var json = JSON.parse(res.text);
            ServerActionCreators.receiveLogin(json, null);
          }
        }
      });
  },

  forgotPassword: function(email) {
    request.post(APIEndpoints.FORGOT_PASSWORD)
      .send({ email: email })
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveForgotPassword(null, errorMsgs);
          } else {
            var json = JSON.parse(res.text);
            ServerActionCreators.receiveForgotPassword(json, null);
          }
        }
      });
  },

  resetPassword: function(userId, resetToken, password) {
    request.post(APIEndpoints.RESET_PASSWORD)
      .send({ user_id: userId, password_reset_token: resetToken, password: password })
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveResetPassword(null, errorMsgs);
          } else {
            var json = JSON.parse(res.text);
            ServerActionCreators.receiveResetPassword(json, null);
          }
        }
      });
  },

  loadSecrets: function() {
    request.get(APIEndpoints.SECRETS)
      .set('Accept', 'application/json')
      .set('Authorization', "Bearer " + sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          var json = JSON.parse(res.text);
          ServerActionCreators.receiveSecrets(json);
        }
      });
  },

  loadAccount: function() {
    request.get(APIEndpoints.ACCOUNT)
      .set('Accept', 'application/json')
      .set('Authorization', "Bearer " + sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          var json = JSON.parse(res.text);
          ServerActionCreators.receiveAccount(json);
        }
      });
  },

  updateAccount: function(email, password) {
    request("PUT", APIEndpoints.ACCOUNT)
      .send({account: { email: email, password: password}})
      .set('Accept', 'application/json')
      .set('Authorization', "Bearer " + sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveUpdateAccount(null, errorMsgs);
          } else {
            var json = JSON.parse(res.text);
            ServerActionCreators.receiveUpdateAccount(json, null);
          }
        }
      });
  }

};
