import React from 'react';
import {Link} from 'react-router';

class Header extends React.Component {
  _logout(e) {
    e.preventDefault();
    this.props.flux.getActions('SessionActions').logout();
  }

  render() {
    var sessionLinks = this.props.isLoggedIn ? (
      [
        <li key="nav-link-logout"><a href='#' onClick={this._logout.bind(this)}>Logout</a></li>,
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
}

export default Header;
