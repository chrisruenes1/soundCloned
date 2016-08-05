const React = require('react');
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');
const ErrorStore = require('../stores/error_store');
const ErrorListItem = require('./error_list_item');
const ErrorConstants = require('../constants/error_constants');
const ErrorActions = require('../actions/error_actions');
import {hashHistory} from 'react-router';

const SignupForm = React.createClass({
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
    SessionActions.signup(submitData);
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

        <div className="form-container" >

          <form className="modal-form signup-form" onSubmit={this.handleSubmit}>

            <ul>
              {
                errorMessages
              }
            </ul>

            <input className="modal-form-element modal-form-input"
              type="text"
              value={this.state.username}
              onChange={this.usernameChange}
              placeholder="username"
              ></input>

            <br></br>

            <input className="modal-form-element modal-form-input"
              type="password"
              value={this.state.password}
              onChange={this.passwordChange}
              placeholder="password"
              ></input>

            <br></br>

            <input className="modal-form-element modal-form-submit"
              type="submit"
              value="Sign Up!"
              ></input>

          </form>
        </div>
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
    if (SessionStore.isUserLoggedIn){
      hashHistory.push("/");
    }
  },
  _onErrorChange(){
    this.setState({errors:ErrorStore.errors(ErrorConstants.SIGNUP)});
  }


});

module.exports = SignupForm;
