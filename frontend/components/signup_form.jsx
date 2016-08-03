const React = require('react');
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');
import {hashHistory} from 'react-router';

const SignupForm = React.createClass({
  getInitialState(){
    return {username:"", password:""};
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
    return(
      <form onSubmit={this.handleSubmit}>

        <input
          type="text"
          value={this.state.username}
          onChange={this.usernameChange}
          ></input>

        <br></br>

        <input
          type="password"
          value={this.state.password}
          onChange={this.passwordChange}
          ></input>

        <br></br>

        <input
          type="submit"
          value="Sign Up!"
          ></input>

      </form>
    );
  },
  componentDidMount(){
    SessionStore.addListener(this._onChange);
  },
  _onChange(){
    if (SessionStore.isUserLoggedIn){
      hashHistory.push("/");
      console.log("Success!");
    }
    else {
      console.log("FAILURE");
    }
  }


});

module.exports = SignupForm;
