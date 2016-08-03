const React = require('react');
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
const Link = require('react-router').Link;
const Navbar = require('./navbar');

const App = React.createClass({
  handleLogoutSubmit(e){
    e.preventDefault();
    SessionActions.logout();
  },
  render(){
    let headerContent;
    if (SessionStore.isUserLoggedIn()){
      headerContent =
        <div>
          <span>Hello, {SessionStore.currentUser().username}!</span>
          <br></br>
          <button onClick={this.handleLogoutSubmit}>Log Out</button>
        </div>;
    }
    else {
      headerContent =
        <div>
          <Link to="/login">Log In</Link>
          <br></br>
          <Link to="/signup">Sign Up</Link>
        </div>;
    }

    return(
      <div>
        <Navbar/>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
