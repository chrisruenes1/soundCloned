module.exports = {
  login(credentials, success, error){
    $.ajax({
      url:'session/',
      type:'POST',
      data: {username: credentials.username, password: credentials.password},
      success,
      error
    });
  },
  signup(user, success, error){
    $.ajax({
      url:'user',
      type:'POST',
      data: {user: user},
      success,
      error
    });
  },
  logout(success, error){
    $.ajax({
      url:'session/',
      type:'DELETE',
      success,
      error
    });
  },
};
