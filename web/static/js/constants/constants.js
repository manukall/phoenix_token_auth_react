import keyMirror from 'keymirror';

var APIRoot = "/api";

export default {
  APIEndpoints: {
    LOGIN: APIRoot + "/v1/sessions",
    LOGOUT: APIRoot + "/v1/sessions",
    REGISTRATION: APIRoot + "/v1/users",
    CONFIRM: APIRoot + "/v1/users/%{userId}/confirm",
    SECRETS: APIRoot + "/v1/secrets",
    FORGOT_PASSWORD: APIRoot + "/v1/password_resets",
    RESET_PASSWORD: APIRoot + "/v1/password_resets/reset",
    ACCOUNT: APIRoot + "/v1/account"
  }
};
