const ErrorConstants = require('../constants/error_constants');

module.exports = {
  login(credentials, success, error){
    $.ajax({
      url:'api/session/',
      type:'POST',
      data: {user: {username: credentials.username, password: credentials.password}},
      success,
      error:function(xhr){
        error(ErrorConstants.LOGIN, xhr.responseJSON);
      }
    });
  },
  signup(user, success, error){
    $.ajax({
      url:'api/users',
      type:'POST',
      data: {user: user},
      success,
      error:function(xhr){
        error(ErrorConstants.SIGNUP, xhr.responseJSON);
      }
    });
  },
  logout(success, error){
    $.ajax({
      url:'api/session',
      type:'DELETE',
      success,
      error:function(xhr){
        error(ErrorConstants.LOGOUT, xhr.responseJSON);
      }
    });
  },
};
