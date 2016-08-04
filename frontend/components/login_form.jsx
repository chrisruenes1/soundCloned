const React = require('react');
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');
const SessionConstants = require('../constants/session_constants');
const ErrorStore = require('../stores/error_store');
const ErrorListItem = require("../components/error_list_item");
const ErrorConstants = require("../constants/error_constants");
import {hashHistory} from 'react-router';

const LoginForm = React.createClass({
  getInitialState(){
    this.listeners = [];
    return {username:"", password:"", errors:[]};
  },
  usernameChange(e){
    let newUsername = e.target.value;
    this.setState({username: newUsername});
  },
  passwordChange(e){
    let newPassword = e.target.value;
    this.setState({password: newPassword});
  },
  handleSubmit(e){
    e.preventDefault();
    let submitData = {
        username:this.state.username,
        password:this.state.password
    };
    SessionActions.login(submitData);
    this.setState({username:"", password:""});
  },
  guestLogin(e){
    e.preventDefault();
    let submitData = SessionConstants.GUEST_CREDENTIALS;
    SessionActions.login(submitData);
    this.setState({username:"", password:""});
  },
  render(){
    let current_error_key = 0;
    let errorMessages = this.state.errors.map( (error) => {
      current_error_key++;
      return <ErrorListItem key={current_error_key} error={error} />;
    });
    return(

      <div>

        <ul>
          {
            errorMessages
          }
        </ul>

        <form className="modal-form" onSubmit={this.handleSubmit}>
          
          <div className="input-container">

            <input className="modal-form-element modal-form-input"
              type="text"
              value={this.state.username}
              onChange={this.usernameChange}
              placeholder="your username"
              ></input>

            <br></br>

            <input className="modal-form-element modal-form-input"
              type="password"
              value={this.state.password}
              onChange={this.passwordChange}
              placeholder="your password"
              ></input>

            <br></br>

            <input className="modal-form-element modal-form-submit"
              type="submit"
              value="Log In!"
              ></input>

            <br></br>
            <div className="modal-form-text-spacer">or</div>
            
            <button onClick={this.guestLogin} className="modal-form-element modal-form-submit">Guest Login</button>
            
          </div>

        </form>
      </div>
    );
  },
  componentDidMount(){
    this.listeners.push(SessionStore.addListener(this._onSessionChange));
    this.listeners.push(ErrorStore.addListener(this._onErrorChange));
  },
  componentWillUnmount(){
    this.listeners.forEach((listener) => {
      listener.remove();
    });
  },
  _onSessionChange(){
    if (SessionStore.isUserLoggedIn()){
      this.props.close();
      hashHistory.push("/");
    }
  },
  _onErrorChange(){
    this.setState({errors:ErrorStore.errors(ErrorConstants.LOGIN)});
  }
});

module.exports = LoginForm;
