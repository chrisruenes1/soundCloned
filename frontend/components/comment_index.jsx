const React = require('react');
const CommentIndexItem = require('./comment_index_item');

const CommentIndex = React.createClass({
  render(){
    return(
      <ul className='comment-image-list'>
        {
          this.props.comments.map((comment) => {
            return <CommentIndexItem comment={comment} key={comment.id}/>;
          })
        }
      </ul>
    );
  }
});

module.exports = CommentIndex;
