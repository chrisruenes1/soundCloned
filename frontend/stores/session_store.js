const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const SessionStore = new Store(AppDispacther);
const SessionConstants = require('../constants/session_constants.js');

let _currentUser = {};

const _login = function(user){
  _currentUser = user;
  SessionStore.__emitChange();
};

const _logout = function(){
  _currentUser = {};
  SessionStore.__emitChange();
};

SessionStore.currentUser = function(){
  return Object.apply({}, _currentUser);
};

SessionStore.isUserLoggedIn = function(){
  return _currentUser.id !== undefined;
};

SessionStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case SessionConstants.LOGIN:
      this._login(payload.user);
      break;
    case SessionConstants.LOGOUT:
      this._logout();
      break;
  }
};
