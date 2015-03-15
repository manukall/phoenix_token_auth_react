var keyMirror = require('keymirror');

var APIRoot = "http://localhost:4000/api";

module.exports = {
  APIEndpoints: {
    LOGIN: APIRoot + "/v1/sessions",
    REGISTRATION: APIRoot + "/v1/users",
    CONFIRM: APIRoot + "/v1/users/%{userId}/confirm"
  },

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ActionTypes: keyMirror({
    // Routes
    REDIRECT: null,
    SIGNUP_REQUEST: null,
    LOGIN_REQUEST: null,
    LOGIN_RESPONSE: null,
    CONFIRM_RESPONSE: null,
    LOGOUT: null
  })
};
