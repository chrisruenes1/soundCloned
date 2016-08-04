const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const UserStore = new Store(AppDispatcher);
const UserConstants = require('../constants/user_constants');

let _user = {};

UserStore.User = function(){
  return Object.assign({}, _user);
};

const _reset_user = function(user){
  _user = user;
  UserStore.__emitChange();
};

const _remove_user = function(){
  _user = {};
  UserStore.__emitChange();
};

UserStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case RECEIVE_USER:
      this.reset_user(payload.user);
      break;
    case REMOVE_USER:
      this.remove_user();
      break;
  }
};

module.exports = UserStore;
