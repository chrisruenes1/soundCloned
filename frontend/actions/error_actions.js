const AppDispatcher = ("../dispatcher/dispatcher");
const ErrorConstants = ("../constants/error_constants");
module.exports = {
  setErrors:function(form, errors){
    Dispatcher.dispatch({
      actionType:ErrorConstants.SET_ERRORS,
      form:form,
      errors:errors
    });
  },
  clearErrors:function(){
    Dispatcher.dispatch({
      actionType:ErrorConstants.CLEAR_ERRORS
    });
  }
};
