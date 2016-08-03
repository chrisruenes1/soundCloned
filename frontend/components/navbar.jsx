const React = require('react');
import { Link } from 'react-router';
const LoginFormModal = require('./login_form_modal');
const Navbar = React.createClass({
  render(){
    return(
      <nav className="navbar">
        <ul className="group">
          <li className="navbar-element navbar-button login"><Link to="/login">Sign in</Link></li>
          <li className="navbar-element navbar-minor">or</li>
          <li className="navbar-element navbar-button signup"><Link to="/signup">Create account</Link></li>
        </ul>
      </nav>
    );
  }
});
module.exports = Navbar;
