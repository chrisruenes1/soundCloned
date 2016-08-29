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
      fname: user.fname || "",
      lname: user.lname || "",
      groupName: user.group_name || "",
      customUrl: user.custom_url || user.username,
      city: user.city || "",
      state: user.state || "",
      bio: user.bio || "",
      image: user.image,
      imageUrl: user.image_url,
      errors:[]};
  },
  updateImage: function (e) {
    e.preventDefault();
    var file = e.currentTarget.files[0];
    var fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ image: file, imageUrl: fileReader.result} );
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  },
  triggerImageInput: function(e) {
    e.preventDefault();
    $("#profile-pic-modal-file-input").trigger('click');
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
    let formData = new FormData();
    for (let key in this.state){
      formData.append(`user[${key}]`, this.state[key]);
    }
    UserActions.editUser(formData, this.state.userId);
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


    //set up image with button overlay
    let image = <img className="modal-profile-picture" src={this.state.imageUrl} />;
    
    let imageWithButton =
    <div className="profile-picture-container">
      <div className="profile-picture-overlay">
        {image}
        <div className="profile-form-button-positioner">
          <div className="image-button-container">
            <button
              className="image-button"
              onClick={this.triggerImageInput}>
                <img
                  className='camera-img'
                  src="https://s3.amazonaws.com/SOUND-CLONED-PROD/images/camera.png" />
                Update image
            </button>
            <input type="file" className="hidden-file-input" id="profile-pic-modal-file-input" onChange={this.updateImage} />
          </div>
        </div>
      </div>;
    </div>;

    return(
      <div>

        <form className="profile-form" onSubmit={this.handleSubmit}>

          <h1 className="modal-form-title">Edit your Profile</h1>
          <hr/>

          <ul>
            {
              errorMessages
            }
          </ul>

          {imageWithButton}

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
              <label className="modal-form-label">Your url (e.g. soundcloned.com/this_is_you)
                <input className="modal-form-element modal-form-input modal-input-long"
                  type="text"
                  defaultValue={this.state.customUrl}
                  onChange={this.update.bind(null, "custom_url")}
                  placeholder="Custom Url"
                ></input>
              </label>
            </section>

            <section className="modal-form-section multi-input-section">
              <label className="modal-form-label label-short">First name
                <input className="modal-form-element modal-form-input modal-input-short"
                    type="text"
                    defaultValue={this.state.fname}
                    onChange={this.update.bind(null, "fname")}
                    placeholder="first name"
                  ></input>
              </label>

              <label className="modal-form-label label-short">Last Name
                <input className="modal-form-element modal-form-input modal-input-short"
                    type="text"
                    defaultValue={this.state.lname}
                    onChange={this.update.bind(null, "lname")}
                    placeholder="last name"
                  ></input>
              </label>

            </section>

            <section className="modal-form-section multi-input-section">

              <label className="modal-form-label label-short">City
                <input className="modal-form-element modal-form-input modal-input-short"
                  type="text"
                  defaultValue={this.state.city}
                  onChange={this.update.bind(null, "city")}
                  placeholder="city"
                  ></input>
              </label>

              <label className="modal-form-label label-short">State
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
