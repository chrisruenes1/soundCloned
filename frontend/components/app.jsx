const React = require('react');

const Placeholder = React.createClass({
  render(){
    return(
      <div>
        <marquee>Watch me go!</marquee>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Placeholder;
