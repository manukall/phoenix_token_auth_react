var React = require('react');

var ErrorNotice = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="alert alert-danger col-lg-6 col-lg-offset-3" role="alert">
          {this.props.message}
        </div>
      </div>
    );
  }
});

module.exports = ErrorNotice;
