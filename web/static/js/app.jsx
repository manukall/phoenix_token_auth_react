require('../css/app.less');
var React = require('react');
var router = require('./stores/router_store.jsx').getRouter();

router.run(function (Handler, state) {
  React.render(<Handler/>, document.getElementById('app'));
});
