const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const ErrorStore = new Store(AppDispatcher);

let _errors = [];
let _form = "";

ErrorStore.errors = function(form){
  if (form === _form){
    return _errors.slice();
  }
};

const _setErrors = function(form, errors){
  _form = form;
  _errors = errors;
  ErrorStore.__emitChange();
};

const _clearErrors = function(){
  _form = "";
  _errors = [];
};

ErrorStore.__onDispatch = function(payload){
  
};
