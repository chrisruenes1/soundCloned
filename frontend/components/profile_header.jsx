const React = require('react');
const FormModal = require('./form_modal');
const ProfileForm = require('./profile_form');
const SessionStore = require('../stores/session_store');
const UserActions = require('../actions/user_actions');


const ProfileHeader = React.createClass({
  getInitialState(){
    return {showEditImageButton: false, imageFile: null, imageUrl: null};
  },

  triggerImageFileInput: function(e) {
    e.preventDefault();
    $("#profile-pic-file-input").trigger('click');
  },
  updateImageFile: function (e) {
    e.preventDefault();
    var file = e.currentTarget.files[0];
    var fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ imageFile: file, imageUrl: fileReader.result} );
      let formData = new FormData();
      formData.append("user[image]", this.state.imageFile);


      UserActions.editUser(formData, SessionStore.currentUser().id);
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }

  },
  showEditImageButton(){
    this.setState({showEditImageButton: true});
  },
  hideEditImageButton(){
    this.setState({showEditImageButton: false});
  },
  render(){
    let editInfo = this.props.user.id === SessionStore.currentUser().id ?
      <FormModal
        className="navbar-button reactive-navbar-button edit-button"
        buttonText="Edit Profile"
        big>

        <ProfileForm customUrl={this.props.customUrl}/>

      </FormModal>
      :
      <div></div>;

    let editImageButtonClass = this.state.showEditImageButton ? "image-button visible" : "image-button hidden";
      let src = this.state.imageUrl ?
        this.state.imageUrl :
        this.props.user.image_url ?
          this.props.user.image_url :
          "";


      let image = src ? <img className="profile-picture" src={src} /> : <div/>;


      let imageWithButton =
      <div
        className="profile-picture-container"
        onMouseOver={this.showEditImageButton}
        onMouseOut={this.hideEditImageButton}
      >

        <div className="profile-picture-overlay">
          {image}
          <div className="image-button-positioner">
            <div className="image-button-container">
              <button
                onClick={this.triggerImageFileInput}
                className={editImageButtonClass}>
                  <img
                    className='camera-img'
                    src="https://s3.amazonaws.com/SOUND-CLONED-PROD/images/camera.png" />
                  Update image
              </button>
              <input type="file" className="hidden-file-input" id="profile-pic-file-input" onChange={this.updateImageFile} />
            </div>
          </div>
        </div>
      </div>;
    return(
      <header className="group profile-header-image">

        {imageWithButton}
        <div className="profile-user-info">
          <span className="profile-element profile-large">{this.props.user.group_name}</span>
          <span className="profile-element profile-small">{this.props.user.fname} {this.props.user.lname}</span>
          <span className="profile-element profile-small">{this.props.user.city}, {this.props.user.state}</span>
        </div>
        {editInfo}

      </header>
    );
  }
});

module.exports = ProfileHeader;
