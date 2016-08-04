const React = require('react');
const UserStore = require('../stores/user_store');
const UserActions = require("../actions/user_actions");

const ProfileForm = React.createClass({
  getInitialState(){
    return {user: UserStore.user()};
  },
  render(){
    return(
      <form>
        <input
          type="text"
          value={this.state.user.groupName}
          onChange={this.groupNameChange}
          placeholder="group name"
        ></input>
        <input
          type="text"
          value={this.state.user.fname}
          onChange={this.fnameChange}
          placeholder="first name"
        ></input>
        <input
          type="text"
          value={this.state.user.lanme}
          onChange={this.lanmeChange}
          placeholder="last name"
        ></input>
        <input
          type="text"
          value={this.state.user.customUrl}
          onChange={this.customUrlChange}
          placeholder="profile url"
        ></input>
        <input
          type="text"
          value={this.state.user.city}
          onChange={this.cityChange}
          placeholder="city"
        ></input>
        <input
          type="text"
          value={this.state.user.state}
          onChange={this.stateChange}
          placeholder="state"
        ></input>
        <textarea
          value={this.bio.user.state}
          onChange={this.bioChange}
          placeholder="your bio here"
        ></textarea>
      </form>
    );
  },
  componentDidMount(){
    UserStore.addListener(_onChange);
    UserActions.fetchUser(this.props.params.customUrl);
  },
  _onChange(){
    this.setState({user: UserStore.user()});
  }
});

module.exports(ProfileForm);
