const React = require('react');
const UserStore = require('../stores/user_store');
const UserActions = require("../actions/user_actions");

const ErrorStore = require('../stores/error_store');
const ErrorListItem = require("../components/error_list_item");
const ErrorConstants = require("../constants/error_constants");

const ProfileForm = React.createClass({
  getInitialState(){
    let user = UserStore.user();
    return {
      groupName: user.group_name,
      fname: user.fname,
      lname: user.lname,
      customUrl: user.custom_url,
      city: user.city,
      state: user.state,
      bio: user.bio,
      errors: []
    };
  },
  groupNameChange(e){
    let newGroupName = e.target.value;
    this.setState({groupName: newGroupName});
  },
  fnameChange(e){
    let newFName = e.target.value;
    this.setState({fname: newFName});
  },
  lnameChange(e){
    let newLName = e.target.value;
    this.setState({lName: newLName});
  },
  customUrlChange(e){
    let newCustomUrl = e.target.value;
    this.setState({customUrl: newCustomUrl});
  },
  cityChange(e){
    let newCity = e.target.value;
    this.setState({city: newCity});
  },
  stateChange(e){
    let newState = e.target.value;
    this.setState({stateName: newState});
  },
  bioChange(e){
    let newBio = e.target.value;
    this.setState({bio: newBio});
  },
  render(){
    
    //error_stuff
    
    let current_error_key = 0;
    let errorMessages = this.state.errors.map( (error) => {
      current_error_key++;
      return <ErrorListItem key={current_error_key} error={error} />;
    });
    
    return(
      <div>

        <ul>
          {
            errorMessages
          }
        </ul>
      
        <form>
          <input className="modal-form-input"
            type="text"
            value={this.state.groupName}
            onChange={this.groupNameChange}
            placeholder="group name"
          ></input>
            
          <br></br>
      
          <input className="modal-form-input"
            type="text"
            value={this.state.fname}
            onChange={this.fnameChange}
            placeholder="first name"
          ></input>
        
          <br></br>
          
          <input className="modal-form-input"
            type="text"
            value={this.state.lname}
            onChange={this.lanmeChange}
            placeholder="last name"
          ></input>
        
          <br></br>
          
          <input className="modal-form-input"
            type="text"
            value={this.state.customUrl}
            onChange={this.customUrlChange}
            placeholder="profile url"
          ></input>
        
          <br></br>
          
          <input className="modal-form-input"
            type="text"
            value={this.state.city}
            onChange={this.cityChange}
            placeholder="city"
          ></input>
        
          <br></br>
          
          <input className="modal-form-input"
            type="text"
            value={this.state.state}
            onChange={this.stateChange}
            placeholder="state"
          ></input>
        
          <br></br>
          
          <textarea
            value={this.state.bio}
            onChange={this.bioChange}
            placeholder="your bio here"
          ></textarea>
        </form>
      </div>
    );
  },
  componentDidMount(){
    UserStore.addListener(this._onUserChange);
    ErrorStore.addListener(this._onErrorChange);
    UserActions.fetchUser(this.props.params.customUrl);
  },
  _onUserChange(){
    this.setState({user: UserStore.user()});
  },
  _onErrorChange(){
    this.setState({errors:ErrorStore.errors(ErrorConstants.USER_PROFILE)});
  }
});

module.exports = ProfileForm;
