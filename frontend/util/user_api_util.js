const ErrorConstants = require('../constants/error_constants');

module.exports = {
  fetchUser(id, success){
    $.ajax({
      url:`/api/users/${id}`,
      type:"GET",
      success,
      error:function(xhr){
        error(ErrorConstants.SIGNUP, xhr.responseJSON);
      }
    });
  }
};
