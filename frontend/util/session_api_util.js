module.exports = {
  login(credentials, success, error){
    console.log("made it to login api_util");
    $.ajax({
      url:'api/session/',
      type:'POST',
      data: {user: {username: credentials.username, password: credentials.password}},
      success,
      error
    });
  },
  signup(user, success, error){
    $.ajax({
      url:'api/users',
      type:'POST',
      data: {user: user},
      success,
      error
    });
  },
  logout(success, error){
    $.ajax({
      url:'api/session',
      type:'DELETE',
      success,
      error
    });
  },
};
