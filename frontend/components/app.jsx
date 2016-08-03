const React = require('react');

const App = React.createClass({
  render(){
    return(
      <div>
        <marquee>Watch me go!</marquee>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
