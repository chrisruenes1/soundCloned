const ErrorConstants = require('../constants/error_constants');

module.exports = {
  createComment(comment, trackId, success, error){
    $.ajax({
      url:`tracks/${trackId}/comments`,
      type: 'POST',
      data: { comment: comment },
      success,
      error: function(xhr){
        error(ErrorConstants.CREATE_COMMENT, xhr.responseJSON);
      }
    });
  },

  editComment(comment, success, error){
    $.ajax({
      url:`tracks/${comment.trackId}/comments/${comment.id}`,
      type: 'PATCH',
      data: { comment: comment },
      success,
      error: function(xhr){
        error(ErrorConstants.EDIT_COMMENT, xhr.responseJSON);
      }
    });
  },

  destroyComment(comment, success, error){
    $.ajax({
      url:`tracks/${comment.trackId}/comments/${comment.id}`,
      type: 'DELETE',
      success,
      error: function(xhr){
        error(ErrorConstants.DELETE_COMMENT, xhr.resposneJSON);
      }
    });
  }
};
