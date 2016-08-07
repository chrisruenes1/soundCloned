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
      submitData[key] = this.state[key];
    }
    submitData.id = this.state.userId;
    UserActions.editUser(submitData);
    this.resetForm();
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

        <div className="form-container">

          <form className="profile-form" onSubmit={this.handleSubmit}>

            <h1 className="modal-form-title">Edit your Profile</h1>
            <hr/>

            <ul>
              {
                errorMessages
              }
            </ul>

            <img className="profile-picture" src="http://funny-pics.co/wp-content/uploads/sinister-otter.jpg" />

            <article className="modal-form-text-info" >

              <section className="modal-form-section">
                <label className="modal-form-label">Display name
                  <input className="modal-form-element modal-form-input modal-input-long"
                    type="text"
                    defaultValue={this.state.groupName}
                    onChange={this.update.bind(null, "group_name")}
                    placeholder="group name"
                  ></input>
                </label>

              </section>

              <section className="modal-form-section">
                <label className="modal-form-label">Your url (e.g. soundcloud.com/we_can_find_you_here)
                  <input className="modal-form-element modal-form-input modal-input-long"
                    type="text"
                    defaultValue={this.state.customUrl}
                    onChange={this.update.bind(null, "custom_url")}
                    placeholder="Custom Url"
                  ></input>
                </label>
              </section>

              <section className="modal-form-section multi-input-section">
                <label className="modal-form-label">First name
                  <input className="modal-form-element modal-form-input modal-input-short"
                      type="text"
                      defaultValue={this.state.fname}
                      onChange={this.update.bind(null, "fname")}
                      placeholder="first name"
                    ></input>
                </label>

                <label className="modal-form-label">Last Name
                  <input className="modal-form-element modal-form-input modal-input-short"
                      type="text"
                      defaultValue={this.state.lname}
                      onChange={this.update.bind(null, "lname")}
                      placeholder="last name"
                    ></input>
                </label>

              </section>

              <section className="modal-form-section multi-input-section">

                <label className="modal-form-label">City
                  <input className="modal-form-element modal-form-input modal-input-short"
                    type="text"
                    defaultValue={this.state.city}
                    onChange={this.update.bind(null, "city")}
                    placeholder="city"
                    ></input>
                </label>

                <label className="modal-form-label">State
                  <input className="modal-form-element modal-form-input modal-input-short"
                      type="text"
                      defaultValue={this.state.state}
                      onChange={this.update.bind(null, "state")}
                      placeholder="state"
                    ></input>
                </label>

              </section>

              <label className="modal-form-label">Your bio!
                <textarea className="modal-form-element modal-form-input modal-form-textarea"
                  defaultValue={this.state.bio}
                  onChange={this.update.bind(null, "bio")}
                  placeholder="bio"
                ></textarea>
              </label>

              <section className="modal-form-section submit-container">

                <input className="modal-form-element modal-form-submit profile-submit"
                  type="submit"
                  value="Update Profile"
                ></input>

            </section>

            </article>

          </form>
        </div>
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
  },
  reset_form(){
    this.setState({
      userId: "",
      fname: "",
      lname: "",
      groupName: "",
      customUrl: "",
      city: "",
      state: "",
      bio: ""
    });
  }
});

module.exports = ProfileForm;
