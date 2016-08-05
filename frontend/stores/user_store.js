const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const UserStore = new Store(AppDispatcher);
const UserConstants = require('../constants/user_constants');

let _user = {};

UserStore.user = function(){
  return Object.assign({}, _user);
};

const _resetUser = function(user){
  _user = user;
  UserStore.__emitChange();
};

const _removeUser = function(){
  _user = {};
  UserStore.__emitChange();
};

UserStore.__onDispatch = (payload) => {
  switch(payload.actionType){
    case UserConstants.RECEIVE_USER:
      _resetUser(payload.user);
      break;
    case UserConstants.REMOVE_USER:
      _removeUser();
      break;
  }
};

module.exports = UserStore;
