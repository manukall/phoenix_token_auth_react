require('../css/app.less');
var React = require('react');
var Hello = require('./hello.jsx');

React.render(
  <Hello />,
  document.getElementById('app')
);
