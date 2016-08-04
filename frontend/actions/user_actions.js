const UserApiUtil = require('../util/user_api_util');
const AppDispatcher = require('../dispatcher/dispatcher');
const UserConstants = require('../constants/user_constants');

module.exports = {
  fetchUser(url){
    UserApiUtil.fetchUser(url, this.receiveUser);
  },
  receiveUser(user){
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_USER,
      user:user
    });
  }
};
