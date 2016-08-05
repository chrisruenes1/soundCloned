const React = require('react');
const ProfileHeader = require('./profile_header');
const UserStore = require('../stores/user_store');
const UserActions = require('../actions/user_actions');

const Profile = React.createClass({
  getInitialState(){
    return {user: UserStore.user()};
  },
  render(){
    return(
      <ProfileHeader user={this.state.user} customUrl={this.props.params.customUrl}/>
    );
  },
  componentDidMount(){
    UserStore.addListener(this._onUserChange);
    UserActions.fetchUser(this.props.params.customUrl);
  },
  _onUserChange(){
    this.setState({user: UserStore.user()});
  }
});

module.exports = Profile;
