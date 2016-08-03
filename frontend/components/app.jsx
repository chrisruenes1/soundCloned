const React = require('react');
const Navbar = require('./navbar');

const App = React.createClass({
  render(){
    return(
      <div>
        <Navbar/>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
