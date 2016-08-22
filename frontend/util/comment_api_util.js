const ErrorConstants = require('../constants/error_constants');

module.exports = {
  fetchAllComments(success){
    $.ajax({
      url: `api/comments`,
      type: `GET`,
      success,
      error: function(xhr){
        error(ErrorConstants.FETCH_COMMENT, xhr.responseJSON);
      }
    });
  },
  createComment(comment, track_id, success, error){
    $.ajax({
      url:`api/tracks/${track_id}/comments`,
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
      url:`api/tracks/${comment.track_id}/comments/${comment.id}`,
      type: 'PATCH',
      data: { comment: comment },
      success,
      error: function(xhr){
        error(ErrorConstants.EDIT_COMMENT, xhr.responseJSON);
      }
    });
  },

  deleteComment(comment, success, error){
    $.ajax({
      url:`api/tracks/${comment.track_id}/comments/${comment.id}`,
      type: 'DELETE',
      success,
      error: function(xhr){
        error(ErrorConstants.DELETE_COMMENT, xhr.resposneJSON);
      }
    });
  }
};
