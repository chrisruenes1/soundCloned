const React = require('react');
import { Link } from 'react-router';
const FormModal = require('./form_modal');
const LoginForm = require('./login_form');
const SignupForm = require('./signup_form');
const ProfileForm = require('./profile_form');
const UploadForm = require('./upload_form');
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
const SessionConstants = require('../constants/session_constants');
const hashHistory = require('react-router').hashHistory;

const Navbar = React.createClass({
  handleLogoutSubmit(e){
    e.preventDefault();
    SessionActions.logout();
  },
  guestLogin(e){
    e.preventDefault();
    let submitData = SessionConstants.GUEST_CREDENTIALS;
    SessionActions.login(submitData);
  },
  render(){
    let currentUser = SessionStore.currentUser();
    let navbarButtons = SessionStore.isUserLoggedIn() ?

    <ul className="group">
      <li className="navbar-element">
        Hello, <Link className="reactive-navbar-text underline" to={`users/url/${currentUser.custom_url}`}>
          {currentUser.username}!
        </Link>
      </li>

      <li><button className="navbar-element navbar-button reactive-navbar-button logout" onClick={this.handleLogoutSubmit}>Log Out</button></li>
      <li className="navbar-element navbar-button reactive-navbar-button"><FormModal buttonText="Upload" big><UploadForm/></FormModal></li>
    </ul>

      :
    <ul className="group">
      <li><button className="navbar-element navbar-button signup" onClick={this.guestLogin}>Guest Login</button></li>
      <li className="navbar-element navbar-button reactive-navbar-button login"><FormModal height='55%' buttonText="Sign In"><LoginForm /></FormModal></li>
      <li className="navbar-element navbar-minor">or</li>
      <li className="navbar-element navbar-button signup"><FormModal buttonText="Create account"><SignupForm /></FormModal></li>
    </ul>;

    return(
      <nav className="navbar">
        {
          navbarButtons
        }
      </nav>
    );
  },
  componentDidMount(){
    this.listeners = [];
    this.listeners.push(SessionStore.addListener(this._onSessionChange));
  },
  componentWillUnmount(){
    this.listeners.forEach((listener) => {
      listener.remove();
    });
  },
  _onSessionChange(){
    if (SessionStore.isUserLoggedIn()){
      hashHistory.push("/");
    }
  },
});
module.exports = Navbar;
