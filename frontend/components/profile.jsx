const React = require('react');
const ProfileHeader = require('./profile_header');
const UserStore = require('../stores/user_store');
const UserActions = require('../actions/user_actions');

const Profile = React.createClass({
  getInitialState(){
    this.listeners = [];
    return {user: UserStore.user()};
  },
  render(){
    return(
      <ProfileHeader user={this.state.user} customUrl={this.props.params.customUrl}/>
    );
  },
  componentWillReceiveProps(newProps){
    UserActions.fetchUser(newProps.params.customUrl);
  },
  componentDidMount(){
    this.listeners.push(UserStore.addListener(this._onUserChange));
    UserActions.fetchUser(this.props.params.customUrl);
  },
  componentWillUnmount(){
    this.listeners.forEach(function(listener){
      listener.remove();
    });
  },
  _onUserChange(){
    this.setState({user: UserStore.user()});
  }
});

module.exports = Profile;
