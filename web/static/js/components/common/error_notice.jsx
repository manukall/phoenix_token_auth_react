import React from 'react';

class ErrorNotice extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="alert alert-danger col-lg-6 col-lg-offset-3" role="alert">
          {this.props.message}
        </div>
      </div>
    );
  }
}

export default ErrorNotice;
