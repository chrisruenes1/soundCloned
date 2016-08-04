const UserApiUtil = require('../actions/user_actions');
const AppDispatcher = require('../dispatcher/dispatcher');
const UserConstants = require('../constants/user_constants');

module.exports = {
  fetchUser(id){
    UserApiUtil.fetchUser(id, this.receiveUser);
  },
  receiveUser(user){
    AppDispatcher.dispatcher({
      actionType: UserConstants.RECEIVE_USER,
      user:user
    });
  }
};
