var keyMirror = require('keymirror');

var APIRoot = "http://localhost:4000/api";

module.exports = {
  APIEndpoints: {
    LOGIN: APIRoot + "/v1/sessions",
    REGISTRATION: APIRoot + "/v1/users"
  },

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ActionTypes: keyMirror({
    // Routes
    REDIRECT: null
  })
};
