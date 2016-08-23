const CommentAPIUtil = require('../util/comment_api_util');
const ErrorActions = require('../actions/error_actions');
const AppDispatcher = require('../dispatcher/dispatcher');
const CommentConstants = require('../constants/comment_constants');

module.exports = {
  fetchAllComments(){
    CommentAPIUtil.fetchAllComments(this.receiveAllComments, ErrorActions.setErrors);
  },
  createComment(comment, track_id){
    CommentAPIUtil.createComment(comment, track_id, this.receiveComment, ErrorActions.setErrors);
  },
  editComment(comment){
    CommmentAPIUtil.ediComent(comment, this.receiveComment, ErrorActions.setErrors);
  },
  deleteComment(comment){
    CommentAPIUtil.deleteComment(comment, this.removeComment, ErrorActions.setErrors);
  },
  receiveAllComments(comments){
    AppDispatcher.dispatch({
      actionType: CommentConstants.RECEIVE_ALL_COMMENTS,
      comments: comments
    });
  },
  receiveComment(comment){
    AppDispatcher.dispatch({
      actionType: CommentConstants.RECEIVE_COMMENT,
      comment: comment
    });
  },
  removeComment(comment){
    AppDispatcher.dispatch({
      actionType: CommentConstants.REOMVE_COMMENT,
      comment: comment
    });
  }

};
