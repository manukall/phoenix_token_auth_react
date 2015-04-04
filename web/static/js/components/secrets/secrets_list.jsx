import React from 'react';

class SecretsList extends React.Component {
  componentDidMount() {
    if (!this.props.isLoggedIn) {
      this.props.flux.getActions("RouterActions").redirect('login');
    } else {
      this.props.flux.getActions("SecretActions").loadSecrets();
    }
  }

  render() {
    return (
      <div className="row">
        {this.props.secrets.map(function(secret, index){
          return (
            <div className="panel panel-default">
              <div className="panel-body" key={"secret-" + index}>{secret.text}</div>
            </div>
            )
        })}
      </div>
    );
  }
}

export default SecretsList;
