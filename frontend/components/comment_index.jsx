const React = require('react');
const CommentIndexItem = require('./comment_index_item');

const CommentIndex = React.createClass({
  render(){
    return(
      <ul className='comment-image-list'>
        {
          this.props.comments.map((comment, idx) => {
            return <CommentIndexItem
              comment={comment}
              track={this.props.track}
              currentComment={this.props.currentComment}
              currentTime={this.props.currentTime}
              idx={idx}
              key={comment.id}/>;
          })
        }
      </ul>
    );
  }
});

module.exports = CommentIndex;
