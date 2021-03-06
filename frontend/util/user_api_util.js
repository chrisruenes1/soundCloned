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

  updateUser(formData, id, success, error){
    $.ajax({
      url:`api/users/${id}`,
      type:"PATCH",
      processData: false,
      contentType: false,
      dataType: 'json',
      data: formData,
      success,
      error:function(xhr){
        error(ErrorConstants.USER_PROFILE, xhr.responseJSON);
      }
    });
  }
};
