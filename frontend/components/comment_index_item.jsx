const React  = require('react');
const CommentActions = require('../actions/comment_actions');
const CommentStore = require('../stores/comment_store');

const CommentIndexItem = React.createClass({
  getInitialState(){
    let currentCommentId = this.props.comment ? this.props.comment.id : -1;
    return ({ shouldShowComment: this.props.comment.id === currentCommentId });
  },
  render(){
    let commentShow = this.state.shouldShowComment ?
    
    <div>
      <span>{this.props.comment.author.name}</span>
      <span>{this.props.comment.body}</span>
    </div>
    
    :
    
    <div></div>;

    let portionDone = this.props.comment.elapsed_time/this.props.track.duration || 0;
    const imageStyle = {
      left: `calc(100% * ${portionDone})`
    };
    return(
      <div>
        <div className='comment-index-item' style={imageStyle}/>
        {commentShow}
      </div>
    );
  }
});

module.exports = CommentIndexItem;
