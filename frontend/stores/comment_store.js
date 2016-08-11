const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const CommentStore = new Store(AppDispatcher);
const CommentConstants = require('../constants/comment_constants');

let _comments = {};
let _currentComment = {};


CommentStore.allCommentsForTrack = function(track_id){
  return _comments[track_id] || [];
};

CommentStore.getCurrentComment = function(){
  return Object.assign({}, _currentComment);
};

const _resetComments = function(comments){
  comments.forEach(function(comment){
    if (_comments[comment.track_id]){
      _comments[comment.track_id].push(comment);
    }
    else {
      _comments[comment.track_id] = [comment];
    }
  });
};

const _addComment = function(comment){
  if (_comments[comment.track_id]){
      _comments[comment.track_id].push(comment);
  }
  else {
    _comments[comment.track_id] = [comment];
  }

  CommentStore.__emitChange();

};

const _removeComment = function(comment){
  let commentIdx = _comments[comment_id].indexOf(comment);
  _comments[comment_id].splice(comment_idx, 1);
  CommentStore.__emitChange();
};

const _setCurrentComment = function(comment){
  _currentComment = comment;
  CommentStore.__emitChange();
};


CommentStore.__onDispatch = function(payload){
  switch (payload.actionType){
    case CommentConstants.RECEIVE_COMMENT:
      _addComment(payload.comment);
      break;
    case CommentConstants.RECEIVE_ALL_COMMENTS:
      _resetComments(payload.comments);
      break;
    case CommentConstants.REMOVE_COMMENT:
      _removeComment(payload.comment);
      break;
    case CommentConstants.SET_CURRENT_COMMENT:
      _setCurrentComment(payload.comment);
      break;
  }
};


module.exports = CommentStore;
