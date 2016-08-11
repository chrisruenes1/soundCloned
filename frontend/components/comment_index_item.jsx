const React  = require('react');
const CommentActions = require('../actions/comment_actions');
const CommentStore = require('../stores/comment_store');

const CommentIndexItem = React.createClass({
  getInitialState(){
    this.commentShowLength = 4000;
    this.listeners = [];
    return ({ shouldShowComment: false, previousTime: 0 });
  },
  previousTime(){
    
  },
  componentDidReceiveProps(){
    console.log("did receive props");
    if (
      this.props.currentTime >= this.props.comment.elapsed_time &&
      this.state.previousTime <= this.props.comment.elapsed_time)
      {
        CommentActions.setCurrentDisplayedComment(this.props.comment);
      }
      this.setState({previousTime: this.props.currentTime});
    },
  render(){
    let commentShow = this.state.shouldShowComment ?
    
    <div>
      <span>{this.props.comment.author.name}</span>
      <span>{this.props.comment.body}</span>
    </div>
    
    :
    
    commentShow = <div></div>;
  

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
  },
  componentDidMount(){
    this.listeners.push(CommentStore.addListener(this._onChange));
  },
  componentWillUnmount(){
    this.listeners.forEach(function(listener){
      listener.remove();
    });
  },
  _onChange(){
    if (CommentStore.getCurrentComment().id === this.props.comment.id){
      this.setState({ shouldShowComment: true });
      window.setTimeout(() => {
        this.setState({ shouldShowComment :false });
      }, this.commentShowLength);
    }
    else {
      this.setState({ shouldShowComment: false });
    }
  }
});




module.exports = CommentIndexItem;
