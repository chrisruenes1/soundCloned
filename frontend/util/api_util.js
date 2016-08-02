module.exports = {
  login(username, password, success, error){
    $.ajax({
      url:'session/',
      type:'POST',
      data: {username: username, password: password},
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
