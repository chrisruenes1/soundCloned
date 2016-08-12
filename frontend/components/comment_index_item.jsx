const React  = require('react');
const CommentActions = require('../actions/comment_actions');
const CommentStore = require('../stores/comment_store');

const CommentIndexItem = React.createClass({
  getInitialState(){
    let currentCommentId = this.props.currentComment ? this.props.currentComment.id : -1;
    return ({ shouldShowComment: this.props.comment.id === currentCommentId });
  },
  componentWillReceiveProps(newProps){
    //CHANGE BACK TO AUTHOR.USERNAME ON BUG FIX
    let currentCommentId = newProps.currentComment ? newProps.currentComment.id : -1;
    if (newProps.comment.id === currentCommentId){
      this.setState({ shouldShowComment: true});
    }
    else {
      this.setState( {shouldShowComment: false } );
    }
  },
  render(){
    let commentShow = this.state.shouldShowComment ?

    <div className="comment-info top-to-bottom">
      <span className="author-name">{this.props.comment.author_id}</span>
      <span className="comment-content">{this.props.comment.content}</span>
    </div>

    :

    <div></div>;

    let portionDone = this.props.comment.elapsed_time/this.props.track.duration || 0;
    const imageStyle = {
      left: `calc(100% * ${portionDone})`
    };

    return(
      <div className='comment-index-item' style={imageStyle}>
        {commentShow}
      </div>
    );
  },
});

module.exports = CommentIndexItem;
