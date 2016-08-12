const React = require('react');
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');
const SessionConstants = require('../constants/session_constants');
const ErrorStore = require('../stores/error_store');
const ErrorListItem = require("../components/error_list_item");
const ErrorConstants = require("../constants/error_constants");


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
  logInGuest(e){
    e.preventDefault();
    let submitData = SessionConstants.GUEST_CREDENTIALS;
    SessionActions.login(submitData);
  },
  switchToSignup(e){
    e.preventDefault();
    this.props.swapChildren("signup");
  },
  render(){
    let current_error_key = 0;
    let errorMessages = this.state.errors.map( (error) => {
      current_error_key++;
      return <ErrorListItem key={current_error_key} error={error} />;
    });
    return(

      <div>

        <div className="form-container">

          <form className="modal-form login-form" onSubmit={this.handleSubmit}>

            <ul>
              {
                errorMessages
              }
            </ul>

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
                value="Sign In!"
                ></input>
              <p className="form-text modal-form-text-spacer">or</p>
              <button className="modal-form-element modal-form-submit"
                onClick={this.logInGuest}
                >Guest Login</button>
            </div>
            <p className="form-text">Don't have an account yet? <button className="clickable-text" onClick={this.switchToSignup}> Click here</button> to sign up.</p>
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
    if (SessionStore.isUserLoggedIn()){
      this.props.close();
    }
  },
  _onErrorChange(){
    this.setState({errors:ErrorStore.errors(ErrorConstants.LOGIN)});
  }
});

module.exports = LoginForm;
