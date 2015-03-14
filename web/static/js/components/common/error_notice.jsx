var React = require('react');

var ErrorNotice = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="alert alert-danger col-lg-6 col-lg-offset-3" role="alert">
          <ul>
            {this.props.errors.map(function(error, index){
              return <li className="error-notice__error" key={"error-"+index}>{error}</li>;
             })}
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = ErrorNotice;
