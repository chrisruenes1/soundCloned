const CommentAPIUtil = require('../util/comment_api_util');
const ErrorActions = require('../actions/error_actions');
const AppDispatcher = require('../dispatcher/dispatcher');
const CommentConstants = require('../constants/comment_constants');

module.exports = {
  createComment(comment, track_id){
    CommentAPIUtil.createComment(comment, track_id, this.receiveTrack, ErrorActions.setErrors);
  },
  editComment(comment){
    CommmentAPIUtil.ediComent(comment, this.receiveTrack, ErrorActions.setErrors);
  },
  deleteComment(comment){
    CommentAPIUtil.deleteComment(comment, this.removeTrack, ErrorActions.setErrors);
  },
  receiveComment(comment){
    AppDispatcher.disaptch({
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
