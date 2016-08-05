const React = require('react');
const UserStore = require('../stores/user_store');
const UserActions = require("../actions/user_actions");

const ErrorStore = require('../stores/error_store');
const ErrorListItem = require("../components/error_list_item");
const ErrorConstants = require("../constants/error_constants");

import { hashHistory } from 'react-router';

const ProfileForm = React.createClass({
  getInitialState(){
    let user = UserStore.user();
    this.listeners = [];
    return {
      userId: user.id,
      fname: user.fname,
      lname: user.lname,
      groupName: user.group_name,
      customUrl: user.custom_url,
      city: user.city,
      state: user.state,
      bio: user.bio,
      errors:[]};
  },
  update(field, e){
    let newValue = e.target.value;
    let updateObject = {};

    //make sure there are no '?' in custom url,
    //this would cause limitless pain!

    if (field === "custom_url"){
      let safe_characters = [];
      for (let i = 0; i <= newValue.length; i++) {
        if (newValue[i] !== '?'){
          safe_characters.push(newValue[i]);
        }
      }
      newValue = safe_characters.join("");
    }

    updateObject[field] = newValue;



    this.setState( updateObject );
  },
  handleSubmit(e){
    e.preventDefault();
    let submitData = {};
    for (let key in this.state){
      if (this.state[key]){
        submitData[key] = this.state[key];
      }
    }
    submitData.id = this.state.userId;
    UserActions.editUser(submitData);
  },
  render(){
    //error_stuff
    let current_error_key = 0;
    let errorMessages = this.state.errors.map( (error) => {
      current_error_key++;
      return <ErrorListItem key={current_error_key} error={error} />;
    });

    if (!this.state.userId){
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
            defaultValue={this.state.groupName}
            onBlur={this.update.bind(null, "group_name")}
            placeholder="group name"
          ></input>

        <input className="modal-form-input profile-medium"
            type="text"
            defaultValue={this.state.fname}
            onBlur={this.update.bind(null, "fname")}
            placeholder="first name"
          ></input>
        <input className="modal-form-input profile-medium"
            type="text"
            defaultValue={this.state.lname}
            onBlur={this.update.bind(null, "lname")}
            placeholder="last name"
          ></input>
        <input className="modal-form-input profile-medium"
            type="text"
            defaultValue={this.state.state}
            onBlur={this.update.bind(null, "state")}
            placeholder="state"
          ></input>
        <input className="modal-form-input profile-medium"
            type="text"
            defaultValue={this.state.city}
            onBlur={this.update.bind(null, "city")}
            placeholder="city"
          ></input>
        <input className="modal-form-input profile-small"
            type="text"
            defaultValue={this.state.customUrl}
            onBlur={this.update.bind(null, "custom_url")}
            placeholder="Custom Url"
          ></input>
          <textarea className="modal-form-input"
            defaultValue={this.state.bio}
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
    //this will make sure that the state of the modal is only affected by
    //fetches that need to happen. If the user specified in the props
    //customUrl does not match the customUrl we fetched from the store,
    //we need to fetch the user again.
    if (this.props.customUrl != this.state.customUrl){
      UserActions.fetchUser(this.props.customUrl);
    }
  },
  componentWillUnmount(){
    this.listeners.forEach(function(listener){
      listener.remove();
    });
  },
  _onUserChange(){
    //little bit of handling to make sure modal stays open on initial refresh
    let shouldClose = false;
    if (this.state.userId){
      shouldClose = true;
    }

    let user = UserStore.user();
    hashHistory.push(`/users/url/${user.custom_url}`);
    this.setState({
      userId: user.id,
      fname: user.fname,
      lname: user.lname,
      groupName: user.group_name,
      customUrl: user.custom_url,
      city: user.city,
      state: user.state,
      bio: user.bio
    });

    if (shouldClose){
      this.props.close();
    }

  },
  _onErrorChange(){
    this.setState({errors:ErrorStore.errors(ErrorConstants.USER_PROFILE)});
  }
});

module.exports = ProfileForm;
