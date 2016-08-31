const UserApiUtil = require('../util/user_api_util');
const AppDispatcher = require('../dispatcher/dispatcher');
const UserConstants = require('../constants/user_constants');
const ErrorActions = require('../actions/error_actions');

module.exports = {
  fetchUser(url){
    UserApiUtil.fetchUser(url, this.receiveUser, ErrorActions.setErrors);
  },
  editUser(formData, id){
    UserApiUtil.updateUser(formData, id, this.receiveUser, ErrorActions.setErrors);
  },
  clearUser(){
    AppDispatcher.dispatch({
      actionType: UserConstants.CLEAR_USER
    });
  },
  receiveUser(user){
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_USER,
      user:user
    });
  }
};
