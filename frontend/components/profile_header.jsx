const React = require('react');
const FormModal = require('./form_modal');
const ProfileForm = require('./profile_form');
const SessionStore = require('../stores/session_store');


const ProfileHeader = React.createClass({

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


      let image = <img className="profile-picture" src="http://funny-pics.co/wp-content/uploads/sinister-otter.jpg" />;
      let imageWithButton =
      <div className="profile-picture">

        <div className="profile-picture-overlay">
          {image}
          <div className="image-button-positioner">
            <div className="image-button-container">
              <button onClick={this.triggerImageFileInput} className="image-button">Update image</button>
              <input type="file" className="hidden-file-input" id="image-file-input" onChange={this.updateImageFile} />
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
