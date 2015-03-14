var keyMirror = require('keymirror');

module.exports = {
  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),
  ActionTypes: keyMirror({
    // Routes
    REDIRECT: null
  })
};
