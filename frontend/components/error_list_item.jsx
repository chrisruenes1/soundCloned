const React = require('react');

const ErrorListItem = React.createClass({
  render(){
    return(
      <li>{this.props.error}</li>
    );
  }
});

module.exports = ErrorListItem;
