const SessionApiUtil = require("../util/api_util");
const AppDispatcher = require ("../dispatcher/dispatcher");
const SessionConstants = require("../constants/session_constants");

module.exports = {
  signup:function(user){
    SessionApiUtil.signup(user, this.receiveCurrentUser);
  },
  login:function(credentials){
    SessionApiUtil.login(credentials, this.receiveCurrentUser);
  },
  logout:function(){
    SessionApiUtil.logout(this.receiveCurrentUser);
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
