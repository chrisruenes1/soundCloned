const ErrorConstants = require('../constants/error_constants');

module.exports = {
  fetchUser(url, success){
    
    $.ajax({
      url:`/api/users/url/${url}`,
      type:"GET",
      success,
      error:function(xhr){
        error(ErrorConstants.USER_PROFILE, xhr.responseJSON);
      }
    });
  }
};
