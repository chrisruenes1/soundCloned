const React = require('react');

const ErrorListItem = React.createClass({
  render(){
    return(
      <li className="error">{this.props.error}</li>
    );
  }
});

module.exports = ErrorListItem;
