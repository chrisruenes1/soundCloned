const React = require('react');

const ProfileHeader = React.createClass({
  render(){
    return(
      <header className="group profile-header-image">
        <img className="profile-picture" src="http://funny-pics.co/wp-content/uploads/sinister-otter.jpg" />
        <div className="profile-user-info">
          <span className="profile-element">{this.props.user.group_name}</span>
          <span className="profile-element">{this.props.user.fname} {this.props.user.lname}</span>
          <span className="profile-element">{this.props.user.city}, {this.props.user.state}</span>
        </div>
      </header>
    );
  }
});

module.exports = ProfileHeader;
