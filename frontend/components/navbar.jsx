const React = require('react');
import { Link } from 'react-router';
const FormModal = require('./form_modal');
const LoginForm = require('./login_form');
const SignupForm = require('./signup_form');
const ProfileForm = require('./profile_form');
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');

const Navbar = React.createClass({

  handleLogoutSubmit(e){
    e.preventDefault();
    SessionActions.logout();
  },
  render(){
    let currentUser = SessionStore.currentUser();
    let sessionButtons = SessionStore.isUserLoggedIn() ?
      <div>
        <li className="navbar-element">
          Hello, <Link to={`users/url/${currentUser.custom_url}`}>
            {currentUser.username}!
          </Link></li>
        <button className="navbar-element navbar-button reactive-navbar-button logout" onClick={this.handleLogoutSubmit}>Log Out</button>
      </div>
      

      :
      <div>
        <li className="navbar-element navbar-button reactive-navbar-button login"><FormModal buttonText="Sign In"><LoginForm /></FormModal></li>
        <li className="navbar-element navbar-minor">or</li>
        <li className="navbar-element navbar-button signup"><FormModal buttonText="Create account"><SignupForm /></FormModal></li>
      </div>;

    return(
      <nav className="navbar">
        <ul className="group">
          {
            sessionButtons
          }
        </ul>
      </nav>
    );
  }
});
module.exports = Navbar;
