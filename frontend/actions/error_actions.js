const AppDispatcher = require("../dispatcher/dispatcher");
const ErrorConstants = require("../constants/error_constants");
module.exports = {
  setErrors:function(form, errors){
    AppDispatcher.dispatch({
      actionType:ErrorConstants.SET_ERRORS,
      form:form,
      errors:errors
    });
  },
  clearErrors:function(){
    AppDispatcher.dispatch({
      actionType:ErrorConstants.CLEAR_ERRORS
    });
  }
};
