const React = require('react');
const UserStore = require('../stores/user_store');
const UserActions = require("../actions/user_actions");

const ErrorStore = require('../stores/error_store');
const ErrorListItem = require("../components/error_list_item");
const ErrorConstants = require("../constants/error_constants");

import { hashHistory } from 'react-router';

const ProfileForm = React.createClass({
  getInitialState(){
    this.listeners = [];
    return {user: UserStore.user(), errors:[]};
  },
  update(field, e){
    let newValue = e.target.value;
    let update = {};
    update[field] = newValue;
    update.id = this.state.user.id;
    UserActions.editUser(update);
  },
  handleSubmit(e){
    e.preventDefault();
    let submitData = {};
    for (let key in this.state.user){
      if (this.state.user[key]){
        submitData[key] = this.state.user[key];
      }
    }
    if (!submitData.custom_url){
      submitData[custom_url] = user.custom_url;
    }
    UserActions.editUser(submitData);
  },
  render(){
    //error_stuff
    let current_error_key = 0;
    let errorMessages = this.state.errors.map( (error) => {
      current_error_key++;
      return <ErrorListItem key={current_error_key} error={error} />;
    });
    
    if (!this.state.user.id){
      return <div></div>;
    }
    
    return(
      <div>

        <ul>
          {
            errorMessages
          }
        </ul>
      
        <form onSubmit={this.handleSubmit}>
          
          <input className="modal-form-input profile-long"
            type="text"
            defaultValue={this.state.user.group_name}
            onBlur={this.update.bind(null, "group_name")}
            placeholder="group name"
          ></input>
        
        <input className="modal-form-input profile-medium"
            type="text"
            defaultValue={this.state.user.fname}
            onBlur={this.update.bind(null, "fname")}
            placeholder="first name"
          ></input>
        <input className="modal-form-input profile-medium"
            type="text"
            defaultValue={this.state.user.lname}
            onBlur={this.update.bind(null, "lname")}
            placeholder="last name"
          ></input>
        <input className="modal-form-input profile-medium"
            type="text"
            defaultValue={this.state.user.state}
            onBlur={this.update.bind(null, "state")}
            placeholder="state"
          ></input>
        <input className="modal-form-input profile-medium"
            type="text"
            defaultValue={this.state.user.city}
            onBlur={this.update.bind(null, "city")}
            placeholder="city"
          ></input>
        <input className="modal-form-input profile-small"
            type="text"
            defaultValue={this.state.user.custom_url}
            onBlur={this.update.bind(null, "custom_url")}
            placeholder="Custom Url"
          ></input>
          <textarea className="modal-form-input"
            defaultValue={this.state.user.bio}
            onBlur={this.update.bind(null, "bio")}
            placeholder="bio"
          ></textarea>
          
          <input className="modal-form-input modal-form-submit"
              type="submit"
              value="Update Profile"
          ></input>
             
        </form>
      </div>
    );
  },
  componentDidMount(){
    this.listeners.push(UserStore.addListener(this._onUserChange));
    this.listeners.push(ErrorStore.addListener(this._onErrorChange));
    UserActions.fetchUser(this.props.params.customUrl);
  },
  componentWillUnmount(){
    this.listeners.forEach(function(listener){
      listener.remove();
    });
  },
  _onUserChange(){
    let user = UserStore.user();
    hashHistory.push(`/users/url/${user.custom_url}`);
    this.setState({user:UserStore.user()});
  },
  _onErrorChange(){
    this.setState({errors:ErrorStore.errors(ErrorConstants.USER_PROFILE)});
  }
});

module.exports = ProfileForm;
