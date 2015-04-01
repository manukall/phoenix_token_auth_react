var React = require('react');
var Link = require('react-router').Link;
var SessionStore = require('../stores/session_store.jsx');
var SessionActionCreators = require('../actions/session_action_creators.jsx');


function getStateFromStores() {
  return {
    isLoggedIn: SessionStore.isLoggedIn()
  };
}

var Header = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  logout: function(e) {
    e.preventDefault();
    SessionActionCreators.logout();
  },

  render: function() {
    var sessionLinks = this.state.isLoggedIn ? (
      [
        <li key="nav-link-logout"><a href='#' onClick={this.logout}>Logout</a></li>,
        <li key="nav-link-account"><Link to="account">Account</Link></li>
      ]
    ) : (
      [
        <li key="nav-link-signup"><Link to="signup">Signup</Link></li>,
        <li key="nav-link-login"><Link to="login">Login</Link></li>
      ]
    )

    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Phoenix Webpack</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right">
              {sessionLinks}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Header;
