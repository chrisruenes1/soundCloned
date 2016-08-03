const SessionApiUtil = require("../util/session_api_util");
const AppDispatcher = require ("../dispatcher/dispatcher");
const SessionConstants = require("../constants/session_constants");
const ErrorActions = require("./error_actions");
import {hashHistory} from 'react-router';

module.exports = {
  signup:function(user){
    SessionApiUtil.signup(user, this.receiveCurrentUser, ErrorActions.setErrors);
  },
  login:function(credentials){
    SessionApiUtil.login(credentials, this.receiveCurrentUser, ErrorActions.setErrors);
  },
  logout:function(){
    SessionApiUtil.logout(this.removeCurrentUser, ErrorActions.setErrors);
  },

  receiveCurrentUser(currentUser){
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGIN,
      currentUser: currentUser
    });
  },

  removeCurrentUser(){
    AppDispatcher.dispatch({
      actionType:SessionConstants.LOGOUT
    });
    hashHistory.push("/login");
  }
};
