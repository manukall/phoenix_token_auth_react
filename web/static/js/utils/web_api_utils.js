var ServerActionCreators = require('../actions/server_action_creators.jsx');
var constants = require('../constants/constants.js');
var request = require('superagent');

function _getErrors(res) {
  var errorMsgs = ["Something went wrong, please try again"];
  if ((json = JSON.parse(res.text))) {
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

  signup: function(email, password, passwordConfirmation) {
    request.post(APIEndpoints.REGISTRATION)
      .send({ user: {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation
      }})
      .set('Accept', 'application/json')
      .end(function(error, res) {
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveSignup(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
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
            json = JSON.parse(res.text);
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
            json = JSON.parse(res.text);
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
            json = JSON.parse(res.text);
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
            json = JSON.parse(res.text);
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
          json = JSON.parse(res.text);
          ServerActionCreators.receiveSecrets(json);
        }
      });
  }

};
