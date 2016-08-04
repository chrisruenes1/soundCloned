const UserApiUtil = require('../util/user_api_util');
const AppDispatcher = require('../dispatcher/dispatcher');
const UserConstants = require('../constants/user_constants');
const ErrorActions = require('../actions/error_actions');

module.exports = {
  fetchUser(url){
    UserApiUtil.fetchUser(url, this.receiveUser, ErrorActions.setErrors);
  },
  receiveUser(user){
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_USER,
      user:user
    });
  }
};
