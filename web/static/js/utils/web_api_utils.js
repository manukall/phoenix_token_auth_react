import constants from '../constants/constants.js';
import request from 'superagent';

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

export default {

  signup: function(flux, email, password) {
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
                        flux.getActions("ServerActions").receiveSignup(null, errorMsgs);
          } else {
            var json = JSON.parse(res.text);
                        flux.getActions("ServerActions").receiveSignup(json, null);
          }
        }
      });
  },

  confirm: function(flux, userId, token) {
    request.post(APIEndpoints.CONFIRM.replace("%{userId}", userId))
      .send({ confirmation_token: token })
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
                        flux.getActions("ServerActions").receiveConfirm(null, errorMsgs);
          } else {
            var json = JSON.parse(res.text);
                        flux.getActions("ServerActions").receiveConfirm(json, null);
          }
        }
      });
  },

  login: function(flux, email, password) {
    request.post(APIEndpoints.LOGIN)
      .send({ email: email, password: password })
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            flux.getActions("ServerActions").receiveLogin(null, errorMsgs);
          } else {
            var json = JSON.parse(res.text);
            flux.getActions("ServerActions").receiveLogin(json, null);
          }
        }
      });
  },

  logout: function(flux) {
    request("DELETE", APIEndpoints.LOGOUT)
      .set('Accept', 'application/json')
      .set('Authorization', "Bearer " + sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            flux.getActions("ServerActions").receiveLogout(null, errorMsgs);
          } else {
            var json = JSON.parse(res.text);
            flux.getActions("ServerActions").receiveLogout(json, null);
          }
        }
      });
  },

  forgotPassword: function(flux, email) {
    request.post(APIEndpoints.FORGOT_PASSWORD)
      .send({ email: email })
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
                        flux.getActions("ServerActions").receiveForgotPassword(null, errorMsgs);
          } else {
            var json = JSON.parse(res.text);
                        flux.getActions("ServerActions").receiveForgotPassword(json, null);
          }
        }
      });
  },

  resetPassword: function(flux, userId, resetToken, password) {
    request.post(APIEndpoints.RESET_PASSWORD)
      .send({ user_id: userId, password_reset_token: resetToken, password: password })
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
                        flux.getActions("ServerActions").receiveResetPassword(null, errorMsgs);
          } else {
            var json = JSON.parse(res.text);
                        flux.getActions("ServerActions").receiveResetPassword(json, null);
          }
        }
      });
  },

  loadSecrets: function(flux) {
    request.get(APIEndpoints.SECRETS)
      .set('Accept', 'application/json')
      .set('Authorization', "Bearer " + sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          var json = JSON.parse(res.text);
                      flux.getActions("ServerActions").receiveSecrets(json);
        }
      });
  },

  loadAccount: function(flux) {
    request.get(APIEndpoints.ACCOUNT)
      .set('Accept', 'application/json')
      .set('Authorization', "Bearer " + sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          var json = JSON.parse(res.text);
          flux.getActions("ServerActions").receiveAccount(json);
        }
      });
  },

  updateAccount: function(flux, email, password) {
    request("PUT", APIEndpoints.ACCOUNT)
      .send({account: { email: email, password: password}})
      .set('Accept', 'application/json')
      .set('Authorization', "Bearer " + sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            flux.getActions("ServerActions").receiveUpdateAccount(null, errorMsgs);
          } else {
            var json = JSON.parse(res.text);
            flux.getActions("ServerActions").receiveUpdateAccount(json, null);
          }
        }
      });
  }

};
