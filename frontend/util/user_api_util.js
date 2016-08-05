const ErrorConstants = require('../constants/error_constants');

module.exports = {
  fetchUser(url, success, error){
    
    $.ajax({
      url:`api/users/url/${url}`,
      type:"GET",
      success,
      error:function(xhr){
        error(ErrorConstants.USER_PROFILE, xhr.responseJSON);
      }
    });
  },
  
  updateUser(user, success, error){
    $.ajax({
      url:`api/users/${user.id}`,
      type:"PATCH",
      success,
      data: {user: user},
      error:function(xhr){
        error(ErrorConstants.USER_PROFILE, xhr.responseJSON);
      }
    });
  }
};
