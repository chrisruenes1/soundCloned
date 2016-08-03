const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const SessionStore = new Store(AppDispatcher);
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
  return Object.assign({}, _currentUser);
};

SessionStore.isUserLoggedIn = function(){
  return _currentUser.id !== undefined;
};

SessionStore.__onDispatch = (payload) =>{
  switch (payload.actionType) {
    case SessionConstants.LOGIN:
      let currentUser = payload.currentUser ? payload.currentUser : {};
      _login(currentUser);
      break;
    case SessionConstants.LOGOUT:
      _logout();
      break;
  }
};

module.exports = SessionStore;
