const React = require('react');
const Navbar = require('./navbar');
const CurrentTrack = require('./current_track');

const App = React.createClass({
  render(){
    return(
      <div>
        <Navbar/>
        {this.props.children}
        <CurrentTrack/>
      </div>
    );
  }
});

module.exports = App;
